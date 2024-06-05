import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-regular-jodi',
  standalone: true,
  imports: [DatePipe, MatExpansionModule,MatDividerModule],
  templateUrl: './regular-jodi.component.html',
  styleUrl: './regular-jodi.component.scss'
})
export class RegularJodiComponent implements OnInit{
  allJodiListData:any
  title:string | undefined
  slug:any
  getMeata:any
  faqSchema:any
  pageDetails:any
  faqData:any
  weeks: any[] = [];
  daysArray: any
  bazaarData:any
  currentWeek:any[] = []
   structuredData: any[] = [];
  dataArray: any;
  orginzedDataArray: any;
  maxRows: any;
  panelOpenState = false;
  constructor(private titleService:Title, private meta:Meta,private sanitizer:DomSanitizer, private global:GlobalService, private actRouter:ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object){
    
  }
  ngOnInit(): void {
    this.actRouter.paramMap.subscribe(p=>{
      this.slug = p.get('id')
    })
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    this.global.getWithoutToken(`page-meta/${this.slug}`).subscribe({
      next:(res:any)=>{
        this.getMeata = res.data[0]
        console.log(res)
        this.setMetaTags()
      },error: (err:any)=>{
        console.log(err)
      }
    })
    this.global.getWithoutToken(`jodi/${this.slug}`).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.pageDetails = res. pageDetails[0]
        this.faqData = res.faq
        this.title = res.bazar.name
        this.toArray(res.bazar)
        this.bazaarData = res.data
        this.structuredData = this.bazaarData;
        this.organizeDataByWeek(this.bazaarData);
      },
      error: (err:any)=>{
        console.log(err)
      }
    })
  }



  setMetaTags(): void {
    console.log(typeof(this.getMeata?.meta_faq_schema))
    this.titleService.setTitle(this.getMeata.meta_title);
    this.meta.updateTag({ name: 'description', content: this.getMeata.meta_desc });
    this.meta.updateTag({ property: 'og:title', content: this.getMeata.meta_og_title });
    this.meta.updateTag({ property: 'og:description', content: this.getMeata.meta_og_desc });
    this.meta.updateTag({ property: 'og:url', content: this.getMeata.meta_og_url });
    if(this.getMeata.meta_index){

      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }else{
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

    }

    this.faqSchema = this.sanitizer.bypassSecurityTrustHtml(this.getMeata.meta_faq_schema);
  }


  toArray(data:any){
    console.log(data)
    this.daysArray = data.day_of_week.split(',');
    console.log(this.daysArray)
  }







  getISOWeek(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  }

  findFirstMonday(date: Date): Date {
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }

  organizeDataByWeek(apiData: any[]): void {
    const filteredData = apiData.filter(item => {
      const [day, month, year] = item.date_time.split('/');
      const itemDate = new Date(`${year}/${month}/${day}`);
      const startDate = new Date(`${year}/01/01`);
      const endDate = new Date(`${year}/12/31`);
      return itemDate >= startDate && itemDate <= endDate;
    });
  
    if (filteredData.length === 0) {
      console.log('No data available from January 1st to the end of the year.');
      return;
    }
  
    const weeksData: any[] = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    let currentWeekData: any[] = [];
    let currentWeekNumber = this.getISOWeek(new Date(filteredData[0].date_time.split('/').reverse().join('/')));
  
    filteredData.forEach(item => {
      const itemDate = new Date(item.date_time.split('/').reverse().join('/'));
      const itemWeekNumber = this.getISOWeek(itemDate);
  
      if (itemWeekNumber === currentWeekNumber) {
        currentWeekData.push(item);
      } else {
        weeksData.push(currentWeekData);
        currentWeekData = [item];
        currentWeekNumber = itemWeekNumber;
      }
    });
  
    if (currentWeekData.length > 0) {
      weeksData.push(currentWeekData);
    }
  
    const organizedData = weeksData.map(week => {
      const firstDay = new Date(week[0].date_time.split('/').reverse().join('/'));
      const lastDay = new Date(week[week.length - 1].date_time.split('/').reverse().join('/'));
      return {
        startDate: this.formatDate(firstDay),
        endDate: this.formatDate(lastDay),
        days: week.map((day:any) => ({
          day: daysOfWeek[new Date(day.date_time.split('/').reverse().join('/')).getDay()],
          date: day.date_time,
          jodi: day.jodi || '-',
          open: day.open || '-',
          close: day.close || '-'
        }))
      };
    });
  
    console.log(organizedData);
    this.dataArray = organizedData;
    this.orginzedDataArray = this.dataArray;
    console.log(this.orginzedDataArray);
  }
  
  
  
  
  
  
  

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }



  getValueForDay(week: any, day: string): string {
    const dayData = week.days.find((item: any) => item.day === day);
    if (dayData && dayData.jodi !== undefined && dayData.jodi !== '') {
      return dayData?.jodi;
    } else {
      return '-';
    }
  }
  


}

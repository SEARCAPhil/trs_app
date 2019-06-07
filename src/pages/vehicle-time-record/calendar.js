/* eslint-disable new-cap */
import style from './style'
import Calendar from 'tui-calendar'; /* ES6 */
import style2 from "tui-calendar/dist/tui-calendar.css";
import moment from 'moment'


export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render()
  }

  async __bindListeners () {
    // set active
    let PubSub = (await import('pubsub-js')).default
    PubSub.publish('MAIN_NAV', 'driver')
    this.loadMenuSection(this.__opt)
    this.loadCalendarMenu ()
    this.loadCalendar()
  }

  async getRecord (opt) {
    this.records = new (await import('./actions/lists')).default()
    return this.records.getRecordsPerVehicleAndDate(opt)
  }

  loadCalendarMenu () {
    let targ = this.__template.querySelector('vehicle-calendar-menu')
    targ.innerHTML = `
      <nav class="nav">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#" data-name="month">Monthly</a></li>
          <li><a href="#" class="text-muted" data-name="day">Daily</a></li>
          <li>
            <a href="#" class="text-muted"><button  data-move="prev">&laquo;</button></a>
          </li>
          <li><a class="text-muted"><button data-move="today">Today</button></a></li>
          <li>
            <a href="#" class="text-muted"><button data-move="next">&raquo;</button></a>
          </li>
          <li class="disabled"><a class="text-muted" id="renderRange"></a></li>
        </ul>
      </nav>
    `
    // change view
    targ.querySelectorAll('li').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(el == e.target)
        if(e.target.getAttribute('data-name')) this.calendar.changeView(e.target.getAttribute('data-name'), true)
      })
    })
    // change date
    targ.querySelectorAll('li').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        let move = e.target.getAttribute('data-move')
        if(move) {
          if(move === 'today') this.calendar.today()
          if(move === 'next') this.calendar.next()
          if(move === 'prev') this.calendar.prev()
          this.setRenderRangeText()
          this.getCalendarRecords ()
        }
      })
    })
  }

  loadCalendar () {
    
    this.calendar = new Calendar(this.__template.querySelector('vehicle-calendar'), {
      usageStatistics: false,
      defaultView: 'month',
      useCreationPopup: false,
      useDetailPopup: true,
      disableDblClick: true,
      disableClick: true,
      taskView: true,
      template: {
        milestone: function(schedule) {
            return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
        },
        milestoneTitle: function() {
            return '<span class="tui-full-calendar-left-content">MILESTONE</span>';
        },
        task: function(schedule) {
            return '#' + schedule.title;
        },
        taskTitle: function() {
            return '<span class="tui-full-calendar-left-content">TASK</span>';
        },
        allday: function(schedule) {
            return getTimeTemplate(schedule, true);
        },
        alldayTitle: function() {
            return '<span class="tui-full-calendar-left-content">ALL DAY</span>';
        },
        time: function(schedule) {
            return '<strong>' + moment(schedule.start.getTime()).format('hh:mm') + '</strong> ' + schedule.title;
        },
        goingDuration: function(schedule) {
            return '<span class="calendar-icon ic-travel-time"></span>' + schedule.goingDuration + 'min.';
        },
        comingDuration: function(schedule) {
            return '<span class="calendar-icon ic-travel-time"></span>' + schedule.comingDuration + 'min.';
        },
        monthMoreTitleDate: function(date, dayname) {
            var day = date.split('.')[2];

            return '<span class="tui-full-calendar-month-more-title-day">' + day + '</span> <span class="tui-full-calendar-month-more-title-day-label">' + dayname + '</span>';
        },
        monthMoreClose: function() {
            return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
        },
        monthGridHeader: function(dayModel) {
            var date = parseInt(dayModel.date.split('-')[2], 10);
            var classNames = ['tui-full-calendar-weekday-grid-date '];

            if (dayModel.isToday) {
                classNames.push('tui-full-calendar-weekday-grid-date-decorator');
            }

            return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
        },
        monthGridHeaderExceed: function(hiddenSchedules) {
            return '<span class="weekday-grid-more-schedules">+' + hiddenSchedules + '</span>';
        },
        monthGridFooter: function() {
            return '';
        },
        monthGridFooterExceed: function(hiddenSchedules) {
            return '';
        },
        monthDayname: function(model) {
            return (model.label).toString().toLocaleUpperCase();
        },
        weekDayname: function(model) {
            return '<span class="tui-full-calendar-dayname-date">' + model.date + '</span>&nbsp;&nbsp;<span class="tui-full-calendar-dayname-name">' + model.dayName + '</span>';
        },
        weekGridFooterExceed: function(hiddenSchedules) {
            return '+' + hiddenSchedules;
        },
        dayGridTitle: function(viewName) {

            // use another functions instead of 'dayGridTitle'
            // milestoneTitle: function() {...}
            // taskTitle: function() {...}
            // alldayTitle: function() {...}

            var title = '';
            switch(viewName) {
                case 'milestone':
                    title = '<span class="tui-full-calendar-left-content">MILESTONE</span>';
                    break;
                case 'task':
                    title = '<span class="tui-full-calendar-left-content">TASK</span>';
                    break;
                case 'allday':
                    title = '<span class="tui-full-calendar-left-content">ALL DAY</span>';
                    break;
            }

            return title;
        },
        schedule: function(schedule) {

            // use another functions instead of 'schedule'
            // milestone: function() {...}
            // task: function() {...}
            // allday: function() {...}

            var tpl;

            switch(category) {
                case 'milestone':
                    tpl = '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + schedule.bgColor + '">' + schedule.title + '</span>';
                    break;
                case 'task':
                    tpl = '#' + schedule.title;
                    break;
                case 'allday':
                    tpl = getTimeTemplate(schedule, true);
                    break;
            }

            return tpl;
        },
        collapseBtnTitle: function() {
            return '<span class="tui-full-calendar-icon tui-full-calendar-ic-arrow-solid-top"></span>';
        },
        timezoneDisplayLabel: function(timezoneOffset, displayLabel) {
            /*var gmt, hour, minutes;

            if (!displayLabel) {
                gmt = timezoneOffset < 0 ? '-' : '+';
                hour = Math.abs(parseInt(timezoneOffset / 60, 10));
                minutes = Math.abs(timezoneOffset % 60);
                displayLabel = gmt + (hour) + ':' + (minutes);
            }*/

            return displayLabel;
        },
        timegridDisplayPrimayTime: function(time) {
            // will be deprecated. use 'timegridDisplayPrimaryTime'
            var meridiem = 'am';
            var hour = time.hour;

            if (time.hour > 12) {
                meridiem = 'pm';
                hour = time.hour - 12;
            }

            return hour + ' ' + meridiem;
        },
        timegridDisplayPrimaryTime: function(time) {
            var meridiem = 'am';
            var hour = time.hour;

            if (time.hour > 12) {
                meridiem = 'pm';
                hour = time.hour - 12;
            }

            return hour + ' ' + meridiem;
        },
        timegridDisplayTime: function(time) {
            return getPadStart(time.hour) + ':' + getPadStart(time.hour);
        },
        timegridCurrentTime: function(timezone) {
            var templates = [];

            if (timezone.dateDifference) {
                templates.push('[' + timezone.dateDifferenceSign + timezone.dateDifference + ']<br>');
            }

            templates.push(moment(timezone.hourmarker).format('HH:mm a'));

            return templates.join('');
        },
        popupIsAllDay: function() {
            return 'All Day';
        },
        popupStateFree: function() {
            return 'Free';
        },
        popupStateBusy: function() {
            return 'Busy';
        },
        titlePlaceholder: function() {
            return 'Subject';
        },
        locationPlaceholder: function() {
            return 'Location';
        },
        startDatePlaceholder: function() {
            return 'Start date';
        },
        endDatePlaceholder: function() {
            return 'End date';
        },
        popupSave: function() {
            return 'Save';
        },
        popupUpdate: function() {
            return 'Update';
        },
        popupDetailDate: function(isAllDay, start, end) {
            var isSameDate = moment(start).isSame(end);
            var endFormat = (isSameDate ? '' : 'MM/DD/YYYY ') + 'hh:mm a';

            if (isAllDay) {
                return moment(start).format('MM/DD/YYYY') + (isSameDate ? '' : ' - ' + moment(end).format('MM/DD/YYYY'));
            }

            return (moment(start).format('MM/DD/YYYY'));
        },
        popupDetailLocation: function(schedule) {
            return 'Location : ' + schedule.location;
        },
        popupDetailUser: function(schedule) {
            return 'User : ' + (schedule.attendees || []).join(', ');
        },
        popupDetailState: function(schedule) {
            return 'State : ' + schedule.state || 'Busy';
        },
        popupDetailRepeat: function(schedule) {
            return 'Repeat : ' + schedule.recurrenceRule;
        },
        popupDetailBody: function(schedule) {
            return schedule.body;
        },
        popupEdit: function() {
            return 'Edit';
        },
        popupDelete: function() {
            return 'Delete';
        }
    }

    })

    this.calendar.on('beforeUpdateSchedule', (e) => { 
      window.location.hash = `#/vehicle/forms/time/${e.schedule.id}/update`
    })

    this.setRenderRangeText()
    this.getCalendarRecords ()
  
    console.log(moment(this.calendar.getDate().getTime()).format('YYYY-MM')+'-01')
   
  }

  getCalendarRecords () {
    this.calendar.clear()
     // get all time records
     this.getRecord ({id: this.__opt.id, date: moment(this.calendar.getDate().getTime()).format('YYYY-MM')+'-01'}).then(res => {
      let schedules = []

      res.data.forEach(el => {
        let day = el.date.substring(8)
        let bgMode = el.mode === 'in' ? '#69BB2D' : '#e91e63'
        day = day < 10 ? day.substring(1) : day

        schedules.push({id: el.id, title: el.mode.toUpperCase(), isAllDay: false, start: `${el.date} ${el.time}`, color: '#ffffff', isVisible: true, bgColor: bgMode, dragBgColor: bgMode, borderColor: bgMode, calendarId: 'logged-workout', category: 'time', dueDateClass: '', customStyle: 'cursor: default;', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: 'SEARCA', attendees: '', recurrenceRule: '', state: '', edit: true})
      })

      /*let schedules = [
        {id: 489273, title: 'IN', isAllDay: false, start: '2019-06-01T11:30:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#69BB2D', dragBgColor: '#69BB2D', borderColor: '#69BB2D', calendarId: 'logged-workout', category: 'time', dueDateClass: '', customStyle: 'cursor: default;', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: 'SEARCA', attendees: '', recurrenceRule: '', state: '', edit: true, body: 'hi hello there'},
        // {id: 18073, title: 'completed with blocks', isAllDay: false, start: '2018-11-17T09:00:00+09:00', end: '2018-11-17T10:00:00+09:00', color: '#ffffff', isVisible: true, bgColor: '#54B8CC', dragBgColor: '#54B8CC', borderColor: '#54B8CC', calendarId: 'workout', category: 'time', dueDateClass: '', customStyle: '', isPending: false, isFocused: false, isReadOnly: false, isPrivate: false, location: '', attendees: '', recurrenceRule: '', state: ''}
     ]*/
      this.calendar.createSchedules(schedules);
    })
  }
  setRenderRangeText() {
    var renderRange = this.__template.querySelector('#renderRange');
    var options = this.calendar.getOptions();
    var viewName = this.calendar.getViewName();
    var html = [];
    if (viewName === 'day') {
        html.push(moment(this.calendar.getDate().getTime()).format('YYYY/MM/DD'));
    } else if (viewName === 'month' &&
        (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
        html.push(moment(this.calendar.getDate().getTime()).format('YYYY/MM'));
    } else {
        html.push(moment(this.calendar.getDateRangeStart().getTime()).format('YYYY/MM/DD'));
        html.push(' ~ ');
        html.push(moment(this.calendar.getDateRangeEnd().getTime()).format(' MM/DD'));
    }
    renderRange.innerHTML = html.join('');
  }


  loadMenuSection (opt) {
    const __menu = import('../../components/vehicle-profile-menu')
    const __target = this.__template.querySelector('.vehicle-profile-menu') || this.__template.querySelector('vehicle-profile-menu')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  loadDateMenuSelection (opt) {
    const __menu = import('../../components/date-selection-menu-bar')
    const __target = this.__template.querySelector('.date-selection-menu-bar') || this.__template.querySelector('date-selection-menu-bar')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  loadTable (opt) {
    const __menu = import('../../components/vehicle-time-record-table')
    const __target = this.__template.querySelector('.vehicle-time-record-table') || this.__template.querySelector('vehicle-time-record-table')
    __menu.then(Res => {
      return new Res.default(opt).then(html => {
        return __target ? __target.replaceWith(html) : null
      })
    })
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('vehicle-section', 'row')
    // this.__dateFields = this.generateDateFields ()
    this.__template.innerHTML = `
      <style>
        ${style2.toString()} 
        ${style.toString()}
      </style>
      <vehicle-profile-menu></vehicle-profile-menu>
        <article class="col col-lg-12 col-md-12 vehicle-profile-section">
          <date-selection-menu-bar></date-selection-menu-bar>
          <main class="col col-lg-12 col-md-12">
            <vehicle-calendar-menu class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"></vehicle-calendar-menu>
            <vehicle-calendar class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"></vehicle-calendar>
            <vehicle-time-record-table></vehicle-time-record-table>

            <!--<section class="col col-lg-12 col-md-12">
            </section>-->
          </main>
        </article>`
    this.__bindListeners()
    return this.__template
  }
}

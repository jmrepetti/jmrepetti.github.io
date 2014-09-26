// http://youmightnotneedjquery.com/

// document.querySelector('#send_txt').value;

var app = {
  
  set_current_date: function (date) {
    this.current_date = date;
  },
  
  current_date : null,
  
  current_date_with_format : function() {
    return this.DateWithFormat.format_date(this.current_date);
  },
  
  DateWithFormat: {
    "day_names" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "month_names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "format_date":function(date) {
    
      day_number = date.getDate();
      day_name = this.day_names[date.getDay()];
      month_name = this.month_names[date.getMonth()];
      year = date.getFullYear();
      date_string = day_name + " " + day_number + " " + month_name + " " + year;
      return date_string;
    },
    "date": function(date) {
      return this.format_date(date);
    },
    "now": function() {
      now = new Date;
      return this.format_date(now);
    }
  }
}


document.addEventListener('DOMContentLoaded', function(){
  

  function set_current_date(date) {
    date_element = document.querySelector('#date');
    date_element.text = app.current_date_with_format();  
    date_element.setAttribute("current_date",app.current_date.toISOString());      
  }
  

  date = new Date;
  app.set_current_date(date);  
  set_current_date(date);
  
});



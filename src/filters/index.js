// import moment from 'moment'
import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('dataString',function(value,formatStr='yyyy-MM-dd, HH:mm:ss'){
  return format(value,formatStr);
})


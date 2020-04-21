window.addEventListener('DOMContentLoaded', function(){
  'use strict';

  let tabs = document.querySelector('.info-header'),
      tabcontent = document.querySelectorAll('.info-tabcontent');
     
      
  // скрываем табы
  function hideTabContent (a){
    for (let i=a; i<tabcontent.length; i++) {
      tabcontent[i].classList.remove('show');
      tabcontent[i].classList.add('hide');
    };
  };
  // технический параметр а для скрытия всех .info-tabcontent кроме первого
  hideTabContent (1);


  // показываем табы
  function showTabContent (b){
    if(tabcontent[b].classList.contains('hide')){
      tabcontent[b].classList.remove('hide');
      tabcontent[b].classList.add('show');
    };
  };

  tabs.addEventListener('click', function(event){
    let target = event.target;
    if(target && target.classList.contains('info-header-tab')){
      for( let i = 0; i< tabs.children.length; i++){
        if(target == tabs.children[i]){
          console.log(target);
          hideTabContent(0);
          showTabContent(i);
          break;
        };
      };
    };
  });

  // Timer
  let deadline = '2020-04-20';
  // let deadline = new Date();

  // получим оставшееся время с текущего момента до дедлайна
  function getTimeRamaining (end){
    let dif = Date.parse(end) - Date.parse( new Date());
    // преобразуем миллисекунды в сек/мин/часы/дни
    let seconds = Math.floor((dif/1000)%60);
    // console.log(seconds);
    let minutes = Math.floor((dif/1000/60)%60);
    // console.log(minutes);
    let hours = Math.floor(dif/1000/60/60);
    // console.log(hours);
    // Если кроме часов нужны еще и дни
    // let hours = Math.floor((dif/1000/60/60)%24);
    // console.log(hours);
    // let days = Math.floor(dif/1000/60/60/24);
    // console.log(days);
    // запишем полученные значения в объект и вернем его из функции
    if (seconds<10){
      seconds = '0' + seconds;
    } ;
    if (minutes<10){
      minutes = '0' + minutes;
    };
    if(hours<10){
      hours = '0' + hours;
    } ;
    if(dif <= 0){
      seconds = '00';
      hours = '00';
      minutes = '00';
    } ;
    return {
      'total': dif,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  // запишем вернувшийся объект в переменную
  let t = getTimeRamaining (deadline);
  console.log(t);

  // получаем из ДОМ элементы таймера и динамически подставляем в них данные
  function setClock (id, endtime){
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

  // полученные из объекта значения динамически подставляем в элементы ДОМ
    function updateClock (){
      let t = getTimeRamaining (endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0){
        clearInterval(timeInterval);
      };
    };

  };
  /*
  function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }
  */
  setClock ('timer', deadline);
});
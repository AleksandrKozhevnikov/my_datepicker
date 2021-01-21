import React, {useState} from 'react'

import { AppButton } from '../ui/AppButton'

import DatePicker from "react-datepicker"
import ru from "date-fns/locale/ru" 
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment';

import Select from 'react-select'

import calendarArrowPrev from '../../assets/miniButtons/calendarArrowPrev.svg'
import calendarArrowNext from '../../assets/miniButtons/calendarArrowNext.svg'


export const Calendar = () => {
    const [calendarValue, setCalendarValue] = useState(new Date())
    const [showCalendarWrapper, setShowCalendarWrapper] = useState(true)
    const [showMonth, setShowMonth] = useState(false)

    const months = ["Январь","Февраль","Март", "Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    const hours = [0, ...Array.from(Array(23).keys(),x=>x+1)]
    const minutes = [0, ...Array.from(Array(59).keys(),x=>x+1)]


    let datePickerMonth = ''
    const CustomTimeInput = ({date, onChange}) => {
        const optionsHours = hours.map(option => (
                {value: `${option}:${date.getMinutes()}`, label: option}
            ))
            
        const optionsMinutes = minutes.map(option => (
            {value: `${date.getHours()}:${option}`, label: option}
        ))
        const calendarTimeSelectStyles = {
            indicatorSeparator: () => ({
                display: 'none'
            }),
            dropdownIndicator: () => ({
                padding: 0,
                opacity: 0.2
            }),
            input: () => ({
                padding: 0
            }),
            control: () => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
                height: 28,
                border: '1px solid #d3d9de',
                borderRadius: 4,
                backgroundColor: '#fff',
                cursor: 'pointer',
            }),
            indicatorsContainer: () => ({
                width: 20,
                height: 20,
                marginRight: 3
            }),
            valueContainer: () => ({
                paddingLeft: 9,
                display: 'flex',
                alignItems: 'center',
            }),
            placeholder: () => ({

            }),
            menu: () => ({
                position: 'absolute',
                top: '100%',
                borderRadius: 4,
                zIndex: 1,
                backgroundColor: '#fff',
                width: 60,
                borderBottom: '1px solid #d3d9de',
                borderRight: '1px solid #d3d9de',
                borderLeft: '1px solid #d3d9de',
            }),
            menuList: () => ({
                height: 220,
                overflowY: 'auto'
            })
        }
        return (
            <div className='calendar__time__wrapper'>
                <div className='calendar__time'>
                    <Select placeholder={date.getHours()} value={date.getHours()} onChange={e => onChange(e.value)} options={optionsHours} styles={calendarTimeSelectStyles} />
                    <div className='calendar__time__colon'>
                        :
                    </div>
                    <Select placeholder={date.getMinutes()} value={date.getMinutes()} onChange={e => onChange(e.value)} options={optionsMinutes} styles={calendarTimeSelectStyles} />
                </div>
                <AppButton
                    onPointerUp={() => setCalendarValue(new Date())}
                    width={88}
                    backgroundColor={'#e5ebf1'}
                    color={'#55677d'}
                    fontSize={13}
                    fontWeight={400}
                    stylesText={{lineHeight: 2}}
                >Сбросить</AppButton>
            </div>
        )
        
    };
    const CalendarInput = ({value, onClick}) => {
        return (
            <div className='calendar__input' onClick={onClick}>
                {value}
            </div>
        )
    }
    let wrapper = ''

    if (showCalendarWrapper) {
        wrapper = 'calendar calendar__show'
    } else {
        wrapper = 'calendar calendar__hide'
    }

    let datePicker = <DatePicker
    selected={calendarValue}
    onChange={date => setCalendarValue(date)}
    calendarClassName={wrapper}
    weekDayClassName={() => 'calendar__header__week'}
    dayClassName={() => 'calendar__header__day'}
    locale={ru}
    shouldCloseOnSelect={false}
    filterDate = {(date) => {
        return moment().subtract(1, 'd') < date;
    }}
    showTimeInput
    customTimeInput={<CustomTimeInput />}
    customInput={<CalendarInput/>}
    dateFormat="d MMMM, yyyy в HH:mm "
    timeFormat='HH:mm'
    wrapperClassName='calendar__input__wrapper'
    open
    onInputClick={() => setShowCalendarWrapper(!showCalendarWrapper)}
    renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
    }) => (
        <div
        style={{
            height: 41,
            display: "flex",
            justifyContent: "space-between"
        }}
        >
            
            <div 
            className='calendar__header__date'
            onClick={() => setShowMonth(!showMonth)}>
                <div className='calendar__header__month'>
                    {months[date.getMonth()]}
                </div>
                <div className='calendar__header__year'>
                    {date.getFullYear()}
                </div>
            </div>
            <div className='calendar__header__buttons'>
                <div 
                    className='calendar__header__button' 
                    onClick={decreaseMonth} 
                    disabled={prevMonthButtonDisabled}
                    style={{background: `url(${calendarArrowPrev}) no-repeat 50% 50%`}}>
                </div>
                <div 
                    className='calendar__header__button' 
                    onClick={increaseMonth} 
                    disabled={nextMonthButtonDisabled}
                    style={{background: `url(${calendarArrowNext}) no-repeat 50% 50%`}}>
                </div>
            </div>
        </div>
        
    )}
    />
  
    if(showMonth === true) {
       /*  setTimeout(() => {const plug = document.querySelector('.react-datepicker__monthPicker')
        plug.insertAdjacentHTML('afterend', '<div className="calendar__month__plug" style=height:24px;border-top:1px;border-top-style:solid;border-top-color:#e7e8ec;background-color:#fafbfc;border-bottom-left-radius:6px;border-bottom-right-radius:6px></div>')}, 0 ) */
        datePicker = <DatePicker
        selected={calendarValue}
        onChange={date => setCalendarValue(date)}
        calendarClassName={wrapper}
        monthClassName={() => 'calendar__month'}
        locale={ru}
        showMonthYearPicker
        showFullMonthYearPicker
        customInput={<CalendarInput/>}
        wrapperClassName='calendar__input__wrapper'
        open
        shouldCloseOnSelect={true}
        onSelect={() => setShowMonth(false)}
        dateFormat="d MMMM, yyyy в HH:mm "
        timeFormat='HH:mm'
        onInputClick={() => setShowCalendarWrapper(true)}
        renderCustomHeader={({
            date,
            decreaseYear,
            increaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
        }) => (
            <div
            style={{
                height: 33,
                display: "flex",
                justifyContent: "space-between"
            }}
            >
                
                <div onClick={() => setShowMonth(!showMonth)} className='calendar__header__date'>
                    <div className='calendar__header__year_month_menu'>
                        {date.getFullYear()}
                    </div>
                </div>
                <div className='calendar__header__buttons'>
                    <div 
                        className='calendar__header__button' 
                        onClick={decreaseYear} 
                        disabled={prevMonthButtonDisabled}
                        style={{background: `url(${calendarArrowPrev}) no-repeat 50% 50%`}}>
                    </div>
                    <div 
                        className='calendar__header__button' 
                        onClick={increaseYear} 
                        disabled={nextMonthButtonDisabled}
                        style={{background: `url(${calendarArrowNext}) no-repeat 50% 50%`}}>
                    </div>
                </div>
            </div>
        )}
        />
    } 
    return datePicker
}
   
    


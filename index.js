import dayjs from 'https://cdn.skypack.dev/dayjs@1.11.18';
import timezone from 'https://cdn.skypack.dev/dayjs/plugin/timezone';
import utc from 'https://cdn.skypack.dev/dayjs/plugin/utc';
import MicroModal from 'https://cdn.skypack.dev/micromodal@0.6.1';

dayjs.extend(timezone);
dayjs.extend(utc);

// Cache user's timezone
const usersTimeZoneDefault = dayjs.tz.guess();
let usersTimeZone = usersTimeZoneDefault;

// Get elements from DOM
const currentTimeZone = document.getElementById('current-time-zone');
const currentTime = document.getElementById('current-time');
const currentDate = document.getElementById('current-date');
const timezones = document.getElementById('timezones');
const applyTimezone = document.getElementById('applyTimeZone');

// Check if elements exist
if (!currentTimeZone || !currentTime || !currentDate || !timezones || !applyTimezone) {
    throw new Error('Missing required DOM elements');
}

// Initialize possible timezones
const listTimezones = Intl.supportedValuesOf("timeZone");
listTimezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz;
    option.text = tz;
    timezones.appendChild(option);
});
timezones.value = usersTimeZoneDefault;

// Apply timezone button event
applyTimezone.addEventListener('click', () => usersTimeZone = timezones.value);

// Clock refresh interval
setInterval(() => {
    const clock = dayjs.utc(Date.now()).tz(usersTimeZone);
    currentTimeZone.textContent = usersTimeZone;
    currentTime.textContent = clock.format('HH:mm:ss');
    currentDate.textContent = clock.format('dddd, DD MMM, YYYY');
}, 1000);

// Modal configuration
MicroModal.init({
    openTrigger: 'data-micromodal-trigger',
    closeTrigger: 'data-micromodal-close',
    openClass: 'is-open',
    disableScroll: true,
    disableFocus: false,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
    debugMode: true
});
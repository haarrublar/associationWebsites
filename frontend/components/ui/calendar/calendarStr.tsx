import {
  Calendar as BigCalendar,
  type CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";

import 'moment-timezone'

moment.tz.setDefault('America/Los_Angeles')

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return <BigCalendar {...props} localizer={localizer} />;
}

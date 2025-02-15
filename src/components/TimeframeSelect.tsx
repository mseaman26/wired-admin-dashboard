
import { globalStyles } from "../globalStyles"
import { FilterFormInterface } from "../interfaces/FilterFormInterface"

interface TimeframeSelectProps {
    formData: FilterFormInterface,
    setFormData: (formData: FilterFormInterface) => void
    timeframe: string
    setTimeframe: (timeframe: Timeframe) => void
}

type Timeframe = 'hour' | 'day' | 'week' | '30 days' | 'year' | '';


const TimeframeSelect = ({ formData, setFormData, timeframe, setTimeframe }: TimeframeSelectProps) => {

    

    const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const endDate = Math.floor(new Date().getTime() / 1000);
        if (e.target.value === 'hour') {
            //set start date to 1 hour ago
            const startDate = Math.floor((new Date().getTime() - 3600000) / 1000);
            setTimeframe('hour');
            setFormData({ ...formData, startDate, endDate });

        } 
        else if (e.target.value === 'day') {
            //set start date to 1 day ago
            const startDate = Math.floor((new Date().getTime() - 86400000) / 1000);
            setTimeframe('day');
            setFormData({ ...formData, startDate, endDate });
        } 
        else if (e.target.value === 'week') {
            //set start date to 1 week ago
            const startDate = Math.floor((new Date().getTime() - 604800000) / 1000);
            setTimeframe('week');
            setFormData({ ...formData, startDate, endDate });
        } 
        else if (e.target.value === '30 days') {
            //set start date to 30 days ago
            const startDate = Math.floor((new Date().getTime() - 2592000000) / 1000);
            setTimeframe('30 days');
            setFormData({ ...formData, startDate, endDate });
        } 
        else if (e.target.value === 'year') {
            //set start date to 1 year ago
            const startDate = Math.floor((new Date().getTime() - 31536000000) / 1000);
            setTimeframe('year');
            setFormData({ ...formData, startDate, endDate });
        }
        else {
            setTimeframe('');
            setFormData({ ...formData, startDate: null, endDate: null });
        }
    }

    return (
        <>
            <label style={globalStyles.label}>Show results within the last...</label>

            <select
                value={timeframe}
                onChange={handleTimeframeChange}
               
            >
                <option value="">{timeframe ? 'none' : 'Select timeframe'}</option>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="30 days">30 days</option>
                <option value="year">Year</option>
            </select>
            <br />
        </>
    )
}

export default TimeframeSelect
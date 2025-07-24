import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Countdown,
  DatePicker,
  DateTimePicker,
  TimePicker,
  Timer,
} from "./index";

const meta: Meta = {
  title: "Components/DateTime",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

// Mock future dates for countdown/timer
const futureDate1 = new Date();
futureDate1.setHours(futureDate1.getHours() + 2);

const futureDate2 = new Date();
futureDate2.setDate(futureDate2.getDate() + 5);

const futureDate3 = new Date();
futureDate3.setFullYear(futureDate3.getFullYear() + 1);

// DatePicker Stories
export const DatePickerBasic: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Basic Date Picker</h3>
        <DatePicker
          selectedValue={selectedDate}
          onSelect={setSelectedDate}
          placeholder="Select a date"
        />
        {selectedDate && (
          <p className="text-sm text-gray-600">
            Selected: {new Date(selectedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const DatePickerWithRestrictions: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Date Picker with Restrictions</h3>
        <DatePicker
          selectedValue={selectedDate}
          onSelect={setSelectedDate}
          min={minDate}
          max={maxDate}
          disableWeekends={true}
          placeholder="Select a weekday (next 30 days)"
        />
        <p className="text-xs text-gray-500">
          Only weekdays in the next 30 days are selectable
        </p>
      </div>
    );
  },
};

export const DatePickerCustomStyling: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Custom Styled Date Picker</h3>
        <DatePicker
          selectedValue={selectedDate}
          onSelect={setSelectedDate}
          className="max-w-xs"
          calendarClassName="shadow-xl border-2 border-blue-200"
          selectedDayClassName="bg-purple-600 text-white"
          todayClassName="bg-yellow-100 text-yellow-800"
          placeholder="Select a date"
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            📅 Custom Trigger
          </button>
        </DatePicker>
      </div>
    );
  },
};

// TimePicker Stories
export const TimePickerBasic: Story = {
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Basic Time Picker</h3>
        <TimePicker
          selectedValue={selectedTime}
          onSelect={setSelectedTime}
          placeholder="Select a time"
        />
        {selectedTime && (
          <p className="text-sm text-gray-600">
            Selected: {new Date(selectedTime).toLocaleTimeString()}
          </p>
        )}
      </div>
    );
  },
};

export const TimePicker24Hour: Story = {
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">
          24-Hour Time Picker with Seconds
        </h3>
        <TimePicker
          selectedValue={selectedTime}
          onSelect={setSelectedTime}
          format="24h"
          showSeconds={true}
          minuteStep={1}
          placeholder="Select time (24h format)"
        />
      </div>
    );
  },
};

// DateTimePicker Stories
export const DateTimePickerBasic: Story = {
  render: () => {
    const [selectedDateTime, setSelectedDateTime] = useState<string | null>(
      null
    );

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Basic DateTime Picker</h3>
        <DateTimePicker
          selectedValue={selectedDateTime}
          onSelect={setSelectedDateTime}
          placeholder="Select date and time"
        />
        {selectedDateTime && (
          <p className="text-sm text-gray-600">
            Selected: {new Date(selectedDateTime).toLocaleString()}
          </p>
        )}
      </div>
    );
  },
};

export const DateTimePickerSeparate: Story = {
  render: () => {
    const [selectedDateTime, setSelectedDateTime] = useState<string | null>(
      null
    );

    return (
      <div className="space-y-4 p-8">
        <h3 className="text-lg font-semibold">Separate Date & Time Picker</h3>
        <DateTimePicker
          selectedValue={selectedDateTime}
          onSelect={setSelectedDateTime}
          separateDateTime={true}
          format="24h"
          showSeconds={true}
          placeholder="Select date and time separately"
        />
      </div>
    );
  },
};

// Countdown Stories
export const CountdownBasic: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Basic Countdown (2 hours)
        </h3>
        <Countdown to={futureDate1} onEnd={() => alert("Countdown ended!")} />
      </div>
    </div>
  ),
};

export const CountdownFormats: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Full Format</h3>
        <Countdown
          to={futureDate2}
          showDays={true}
          showHours={true}
          showMinutes={true}
          showSeconds={true}
          format="full"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Format</h3>
        <Countdown
          to={futureDate2}
          showDays={true}
          showHours={true}
          showMinutes={true}
          showSeconds={true}
          format="compact"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Format</h3>
        <Countdown
          to={futureDate2}
          showDays={true}
          showHours={true}
          showMinutes={true}
          showSeconds={true}
          format="minimal"
        />
      </div>
    </div>
  ),
};

export const CountdownCustom: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Styled Countdown</h3>
        <Countdown
          to={futureDate3}
          showYears={true}
          showMonths={true}
          showDays={true}
          showHours={true}
          showMinutes={true}
          showSeconds={true}
          className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300"
          digitClassName="text-purple-600"
          labelClassName="text-purple-800"
          separatorClassName="text-purple-400"
        />
      </div>
    </div>
  ),
};

// Timer Stories
export const TimerBasic: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Timer (2 hours)</h3>
        <Timer to={futureDate1} onEnd={() => alert("Timer ended!")} />
      </div>
    </div>
  ),
};

export const TimerSizes: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-8">
        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Small (100px)</h4>
          <Timer to={futureDate1} size={100} strokeWidth={6} />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Medium (150px)</h4>
          <Timer to={futureDate1} size={150} strokeWidth={8} />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Large (200px)</h4>
          <Timer to={futureDate1} size={200} strokeWidth={10} />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Extra Large (250px)</h4>
          <Timer to={futureDate1} size={250} strokeWidth={12} />
        </div>
      </div>
    </div>
  ),
};

export const TimerCustomColors: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-8">
        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Blue Theme</h4>
          <Timer
            to={futureDate1}
            size={150}
            progressColor="#3B82F6"
            backgroundColor="#DBEAFE"
            textColor="#1E40AF"
          />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Green Theme</h4>
          <Timer
            to={futureDate1}
            size={150}
            progressColor="#10B981"
            backgroundColor="#D1FAE5"
            textColor="#065F46"
          />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Purple Theme</h4>
          <Timer
            to={futureDate1}
            size={150}
            progressColor="#8B5CF6"
            backgroundColor="#EDE9FE"
            textColor="#5B21B6"
          />
        </div>

        <div className="text-center">
          <h4 className="text-sm font-medium mb-2">Red Theme</h4>
          <Timer
            to={futureDate1}
            size={150}
            progressColor="#EF4444"
            backgroundColor="#FEE2E2"
            textColor="#B91C1C"
          />
        </div>
      </div>
    </div>
  ),
};

export const TimerWithDays: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Timer with Days (5 days remaining)
        </h3>
        <Timer
          to={futureDate2}
          showDays={true}
          showHours={true}
          showMinutes={true}
          showSeconds={true}
          size={220}
          strokeWidth={10}
        />
      </div>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<string | null>(
      null
    );
    const [countdownTarget, setCountdownTarget] = useState(() => {
      const future = new Date();
      future.setMinutes(future.getMinutes() + 5);
      return future.toISOString().slice(0, 16); // Format for datetime-local input
    });

    return (
      <div className="space-y-8 p-8 max-w-4xl">
        <h3 className="text-xl font-bold">
          Interactive DateTime Components Demo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Date Picker</h4>
            <DatePicker
              selectedValue={selectedDate}
              onSelect={setSelectedDate}
              placeholder="Pick a date"
            />
            {selectedDate && (
              <p className="text-sm text-gray-600">
                Selected: {new Date(selectedDate).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Time Picker</h4>
            <TimePicker
              selectedValue={selectedTime}
              onSelect={setSelectedTime}
              placeholder="Pick a time"
            />
            {selectedTime && (
              <p className="text-sm text-gray-600">
                Selected: {new Date(selectedTime).toLocaleTimeString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">DateTime Picker</h4>
            <DateTimePicker
              selectedValue={selectedDateTime}
              onSelect={setSelectedDateTime}
              placeholder="Pick date and time"
            />
            {selectedDateTime && (
              <p className="text-sm text-gray-600">
                Selected: {new Date(selectedDateTime).toLocaleString()}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Custom Countdown Target</h4>
            <input
              type="datetime-local"
              value={countdownTarget}
              onChange={(e) => setCountdownTarget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Countdown</h4>
            <Countdown
              to={new Date(countdownTarget)}
              showDays={true}
              showHours={true}
              showMinutes={true}
              showSeconds={true}
              format="compact"
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Timer</h4>
            <Timer
              to={new Date(countdownTarget)}
              showDays={true}
              showHours={true}
              showMinutes={true}
              showSeconds={true}
              size={180}
            />
          </div>
        </div>
      </div>
    );
  },
};

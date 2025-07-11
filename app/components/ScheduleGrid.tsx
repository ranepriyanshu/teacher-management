import { Availability } from '../types/teacher';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 08‑19

type Props = {
  availability: Availability | undefined;
  onToggle: (key: string) => void;
};

export default function ScheduleGrid({ availability = {}, onToggle }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Weekly Availability</h2>

      <div className="grid grid-cols-[60px_repeat(7,minmax(90px,1fr))] text-sm">
        <div></div>
        {days.map((d) => (
          <div key={d} className="text-center font-medium border-b pb-1">
            {d}
          </div>
        ))}

        {hours.map((h) => (
          <>
            <div key={`${h}-label`} className="pr-2 text-right border-r font-medium">
              {h}:00
            </div>
            {days.map((d) => {
              const key = `${d}-${h}`;
              const busy = availability[key];
              return (
                <div
                  key={key}
                  className={`h-10 border cursor-pointer transition
                    ${busy ? 'bg-green-500 hover:bg-green-600' : 'hover:bg-gray-200'}`}
                  onClick={() => onToggle(key)}
                  title={busy ? 'Busy' : 'Free'}
                />
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

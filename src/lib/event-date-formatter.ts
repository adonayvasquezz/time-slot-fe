export function formatEventDates(body: any) {
  const { date, startTime, endTime, ...rest } = body;

  if (!date || !startTime || !endTime) {
    return body;
  }

  const [year, month, day] = date.split("-").map(Number);

  const startTimeObj = new Date(startTime);
  const endTimeObj = new Date(endTime);

  const formattedStartTime = new Date(year, month - 1, day);
  formattedStartTime.setHours(
    startTimeObj.getHours(),
    startTimeObj.getMinutes(),
    startTimeObj.getSeconds(),
    startTimeObj.getMilliseconds()
  );

  const formattedEndTime = new Date(year, month - 1, day);
  formattedEndTime.setHours(
    endTimeObj.getHours(),
    endTimeObj.getMinutes(),
    endTimeObj.getSeconds(),
    endTimeObj.getMilliseconds()
  );

  const formattedDate = new Date(year, month - 1, day);

  return {
    ...rest,
    date: formattedDate.toISOString(),
    startTime: formattedStartTime.toISOString(),
    endTime: formattedEndTime.toISOString(),
  };
}

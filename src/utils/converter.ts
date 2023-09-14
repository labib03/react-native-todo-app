export const convertFirestoreTimestamp = (date: any) => {
  const ts = (date.seconds + date.nanoseconds / 1000000000) * 1000;

  return new Date(ts);
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, { exercises }) => s + exercises, 0);
  return <b> Total of {total} exercises</b>;
};

export default Total;

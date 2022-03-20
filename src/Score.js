function Score({ children, value }) {
  return (
    <div className="Score">
      <div className="Score-num">{children}</div>
      <div className="Score-name">{value}</div>
    </div>
  );
}

export default Score;

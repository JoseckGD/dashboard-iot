
export const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {

    return (
      <div>
        <strong>{`Date: ${payload[0].payload.name}, ${payload[0].payload.hour}`}</strong> <br />
        <p>{payload[0].payload.uv}</p>
      </div>
    )
  }

  return null;
}
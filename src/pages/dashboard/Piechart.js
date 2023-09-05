import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory';

const PieChart = ({ totalPaid, totalPrice }) => {
  const totalValue = totalPaid + totalPrice ;

  const formatPercentage = (value) => ((value / totalValue) * 100).toFixed(2);

  const data = [
    { x: `Overdue (${formatPercentage(totalPaid)}%)`, y: totalPaid },
    { x: ` (${formatPercentage(totalPrice)}%)`, y: totalPrice },
  ];

  return (
    <VictoryPie
    innerRadius={40}
    padAngle={3}
    padding={100}
      data={data}
      colorScale={['#cd2f5b', '#53a85d']}
      labelComponent={
        <VictoryLabel text={({ datum }) => `${datum.x}`} style={{ fontSize: 11, fontWeight: 'italic' }} />
      }
      width={500} 
      height={500} 
      animate={{
        duration: 1000
      }}
    
    />
  );
};

export default PieChart;

import React from 'react';
import { Dimensions, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { theme } from '../../theme';

const Chart = ({ expanded, seed, paid, sprayer, fertilizer, oil, rented }) => {
  const data = [
    { x: 'Nafta', y: oil },
    { x: 'Uslužno', y: paid },
    { x: 'Seme', y: seed },
    { x: 'Zaštita', y: sprayer },
    { x: 'Prihrana', y: fertilizer },
    { x: 'Zakup', y: rented },
  ].filter(item => item.y > 0);
  return (
    <View
      style={{
        height: expanded && data.length ? null : 0,
        overflow: 'hidden',
        alignItems: 'center',
      }}
    >
      <VictoryPie
        data={data}
        colorScale={[
          theme.colors.primary,
          theme.colors.secondary,
          theme.colors.tertiary,
          '#6c5ce7',
          'cyan',
          'tomato',
        ]}
        padding={{ top: 20, bottom: 35 }}
        cornerRadius={theme.sizes.radius / 3}
        padAngle={3}
        height={Dimensions.get('window').width / 2}
      />
    </View>
  );
};

export default Chart;

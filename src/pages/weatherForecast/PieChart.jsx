import { ResponsivePie } from "@nivo/pie"

export default function OverviewChart({ data }) {
  return (
    <div className="w-full h-50">
      <ResponsivePie
        data={data}
        innerRadius={0.6}
        padAngle={0.6}
        cornerRadius={2}
        sortByValue={true}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
        theme={{
          tooltip: {
            container: {
              background: '#222222d7',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: 14,
            },
          },
        }}
      />
    </div>
  )
}
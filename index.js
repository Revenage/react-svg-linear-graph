class TodoApp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const points = [100, 28, 89, 33, 54, 12, 90, 56, 84, 37, 19, 129];
        const height = Math.max(...points);
        const step = 100 / (points.length - 1);
        const line = `m-10,${height + 10} l0,-${points[0] + 10} l10,0 `;
        /* var path = `m-10,${height+10} l0,-${points[0]+10} l10,0 `;
        for(var p=1; p<points.length; p++) {
            path += `l${step}, ${points[p-1]-points[p]} `;
        }
        path += `l10, ${points[points.length-1]+10} z`; */

        let path = points.reduce((acc, currentValue, index, points) => {
            const diffValue = points[index - 1] - currentValue;
            const lastIndex = points.length - 1;
            const lastValue = points[lastIndex] + 10;
            const currentPath = acc + `l${step}, ${diffValue} `;
            if (index === 0) {
                return acc;
            } else if (index === lastIndex) {
                return currentPath + `l10, ${lastValue} z`;
            } else {
                return currentPath;
            }
        }, line)

        return (
            <svg
                width="100%"
                height="200px"
                id="graph"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 100 ${height}`}
                preserveAspectRatio="none"
            >
                <linearGradient
                    id="linearGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%">
                    <stop
                        style={{
                            stopSolor: '#5677fc',
                            stopOpacity: 0.3
                        }}
                        offset="0"
                    />
                    <stop
                        style={{
                            stopColor: '#5677fc',
                            stopOpacity: 0
                        }}
                        offset="1"
                    />
                </linearGradient>
                <path
                    id="line"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
                    fill='url(#linearGradient)'
                    style={{

                        stroke: '#5677fc'
                    }}
                    d={path}
                />
            </svg>
        )
    }
}

ReactDOM.render(<TodoApp />, document.querySelector("#app"))

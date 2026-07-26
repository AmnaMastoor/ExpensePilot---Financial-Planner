import styles from "../../styles/dashboardStyles";


export default function PieChart({ data }) {


  const categoryData = data || [];



  const size = 170;

  const radius = size / 2;



  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF"
  ];



  const formattedData = categoryData.map(
    (item, index) => ({

      label: item.category,

      value: item.amount,

      color:
        colors[index % colors.length]

    })
  );



  const total = formattedData.reduce(
    (sum, item) =>
      sum + item.value,
    0
  );



  let cumulative = 0;



  const slices = formattedData.map(
    (item) => {


      const startAngle =
        total === 0
          ? 0
          : (cumulative / total) * 360;



      cumulative += item.value;



      const endAngle =
        total === 0
          ? 0
          : (cumulative / total) * 360;



      return {

        ...item,

        startAngle,

        endAngle

      };

    }
  );



  const polarToCartesian = (angle) => {


    const rad =
      ((angle - 90) * Math.PI) / 180;



    return {

      x:
        radius +
        radius * Math.cos(rad),


      y:
        radius +
        radius * Math.sin(rad)

    };

  };



  const describeSlice = (
    startAngle,
    endAngle
  ) => {


    const start =
      polarToCartesian(endAngle);


    const end =
      polarToCartesian(startAngle);



    const largeArcFlag =
      endAngle - startAngle <= 180
        ? 0
        : 1;



    return `
      M ${radius} ${radius}
      L ${start.x} ${start.y}
      A ${radius} ${radius}
      0 ${largeArcFlag}
      0 ${end.x} ${end.y}
      Z
    `;

  };



  const labelPosition = (
    startAngle,
    endAngle
  ) => {


    const middle =
      (startAngle + endAngle) / 2;



    const rad =
      ((middle - 90) * Math.PI) / 180;



    return {


      x:
        radius +
        radius *
        1.35 *
        Math.cos(rad),


      y:
        radius +
        radius *
        1.35 *
        Math.sin(rad)

    };

  };



  const canvasWidth = size + 220;

  const canvasHeight = size + 140;


  const offsetX =
    (canvasWidth - size) / 2;


  const offsetY =
    (canvasHeight - size) / 2;



  return (

    <div style={styles.panel}>


      <h3 style={styles.panelTitle}>
        Expenses by Category
      </h3>



      {
        formattedData.length === 0 ?

        (
          <p>
            No expense data available
          </p>
        )

        :

        (

        <div style={styles.pieWrap}>


          <svg
            width={canvasWidth}
            height={canvasHeight}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          >


            <g
              transform={
                `translate(${offsetX},${offsetY})`
              }
            >



            {
              slices.map(
                (slice,index)=>(

                <path

                  key={index}

                  d={
                    describeSlice(
                      slice.startAngle,
                      slice.endAngle
                    )
                  }


                  fill={slice.color}


                  stroke="#fff"


                  strokeWidth="2"

                />

                )
              )
            }



            {
              slices.map(
                (slice,index)=>{


                  const pos =
                    labelPosition(
                      slice.startAngle,
                      slice.endAngle
                    );



                  return (

                    <text

                      key={index}

                      x={pos.x}

                      y={pos.y}

                      fontSize="10"

                      textAnchor="middle"

                    >

                      {slice.label}

                      <tspan>
                        {" "}
                        ({slice.value})
                      </tspan>


                    </text>

                  );


                }
              )
            }



            </g>


          </svg>


        </div>

        )

      }


    </div>

  );

}
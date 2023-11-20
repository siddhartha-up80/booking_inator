import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Radio, Typography } from "@material-tailwind/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [details, setDetails] = useState("");
  const [amountData, setAmountData] = useState([]);
  const [disableData, setDisableData] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [custom, setCustom] = useState(0);

  const getDetails = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/details`);
      let response = await res.json();
      let Data = response.responseData.data;
      console.log(Data);
      // console.log(Data.amount.category_6);

      setDetails(Data);

      const amount = [];
      amount.push(...Object.values(Data.amount));

      amount.sort((a, b) => b - a);
      // const newArray = array.filter((item) => item !== Data.amount.category_6);
      setAmountData(amount.filter((item) => item !== Data.amount.category_6));
      setCustom(Data.amount.category_6);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const disableValues = () => {
    if (details.charge_customers == true) {
      setDisableData(false);
    } else if (details.charge_customers == false) {
      setDisableData(true);
    }
  };
  console.log("disabled:", disableData);
  //   console.log(amountData);

  useEffect(() => {
    getDetails();
    disableValues();
  }, []);

  const disableButton = () => {
    if (custom < 99) {
      setEnableButton(false);
    } else if (custom > 99) {
      setEnableButton(true);
    }
  };
  const handleChange = (e) => {
      
    if (e.target.name == "custom") {
      setCustom(e.target.value);
    }
  };

useEffect(() => {
  disableButton();
}, [custom])


  //   console.log("custom:", custom);

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Price",
        data: [custom, ...amountData],
        backgroundColor: "#f0c3f1",
        borderColor: "#f0c3f1",
        borderWidth: 1,
        barPercentage: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: [
          "custom",
          "category 1",
          "category 2",
          "category 3",
          "category 4",
        ],
        scaleLabel: {
          display: true,
          labelString: "X-axis Label",
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Price",
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 3,
          topRight: 3,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col h-screen gap-5">
        <div>
          <span>
            <h1 className="text-3xl">
              {details.name}, {details.location} on Dhun Jam
            </h1>
          </span>
        </div>

        <div>
          <form onSubmit={() => {}} className="flex flex-col gap-5">
            <div className="flex flex-row justify-between">
              <span>
                Do you want to charge your customers for requesting songs?
              </span>
              <span>
                <Radio
                  name="type"
                  label={
                    <Typography
                      // color="purple"
                      className="flex font-medium text-white"
                    >
                      Yes
                    </Typography>
                  }
                  className="bg-white"
                  defaultChecked
                />
                <Radio
                  name="type"
                  label={
                    <Typography
                      //   color="white"
                      className="flex font-medium text-white"
                    >
                      No
                    </Typography>
                  }
                  className="bg-white"
                />
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Custom song request amount-</span>
              <span>
                <input
                  type="text"
                  name="custom"
                  value={custom}
                  onChange={handleChange}
                  className="bg-black text-white border rounded-lg text-center"
                />
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span>Regular song request amounts, from high to low-</span>
              <span className="">
                <span className="border text-center rounded-lg px-2 py-1 mx-1">
                  {amountData[0]}
                </span>
                <span className="border text-center rounded-lg px-2 py-1 mx-1">
                  {amountData[1]}
                </span>
                <span className="border text-center rounded-lg px-2 py-1 mx-1">
                  {amountData[2]}
                </span>
                <span className="border text-center rounded-lg px-2 py-1 mx-1">
                  {amountData[3]}
                </span>
              </span>
            </div>

            {disableData == false && (
              <div className="relative">
                <div className="mt-10 -left-20 absolute ">Rupees</div>
                <div className=" mt-10">
                  <div className="border-l-2 md:h-[255px] h-[21vh] border-white absolute op-[222px]"></div>
                  <Bar data={data} options={options} />
                  <div className="border-t-2 border-white relative -top-7"></div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className=" w-full bg-[#6741D9] p-2 rounded-lg disabled disabled:opacity-40"
                disabled={disableData == true ? true : enableButton == false}
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
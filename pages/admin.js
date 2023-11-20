import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Radio, Typography } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
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

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const getDetails = async () => {
    try {
      const id = localStorage.getItem("id");
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/details/?id=${id}`
      );
      let response = await res.json();
      let Data = response.responseData.data;
      console.log(Data);
      // console.log(Data.amount.category_6);

      setDetails(Data);

      const amount = [];
      amount.push(...Object.values(Data.amount));
      amount.splice(0, 1);
      amount.sort((a, b) => b - a);
      setAmountData(amount);
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
  //   console.log("disabled:", disableData);
  console.log(amountData);

  useEffect(() => {
    //   getId()
    setTimeout(() => {
      getDetails();
      disableValues();
    }, 500);
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
  }, [custom]);

  //   console.log("custom:", custom);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: {
          category_6: custom,
        },
        id: id,
      }),
    });
    let response = await res.json();
    console.log(response);

    if (response.success) {
      console.log("Done");
    } else {
      console.log("Error", response.error);
    }
  };

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
          "Custom",
          "Category 1",
          "Category 2",
          "Category 3",
          "Category 4",
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
      {details ? (
        <div className="flex justify-center items-center flex-col h-screen gap-5 p-5 ">
          <div>
            <span>
              <h1 className="text-3xl font-bold">
                {details.name}, {details.location} on Dhun Jam
              </h1>
            </span>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
              <div className="flex flex-row justify-between">
                <span className="max-w-[300px]">
                  Do you want to charge your customers for requesting songs?
                </span>
                <span>
                  <Radio
                    name="type"
                   color="white"
                    label={
                      <Typography className="flex font-medium text-white">
                        Yes
                      </Typography>
                    }
                    onClick={() => setDisableData(false)}
                    className="bg-[#6741D9]"
                    defaultChecked
                  />
                  <Radio
                    name="type"
                    color="white"
                    label={
                      <Typography className="flex font-medium text-white">
                        No
                      </Typography>
                    }
                    onClick={() => setDisableData(true)}
                    className="bg-[#6741D9]"
                  />
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="max-w-[300px]">
                  Custom song request amount-
                </span>
                <span className="max-w-[300px]">
                  <input
                    type="text"
                    name="custom"
                    value={custom}
                    onChange={handleChange}
                    disabled={disableData}
                    className="bg-black text-white border rounded-lg text-center py-1"
                  />
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="max-w-[300px]">
                  Regular song request amounts, from high to low-
                </span>
                <span className="max-w-[300px]">
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
                    <div className="border-l-2 md:h-[77%] h-[74%] border-white absolute op-[222px]"></div>
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      )}
    </div>
  );
};

export default Admin;

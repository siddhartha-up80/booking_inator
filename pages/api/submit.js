export default async function handler(req, res) {
  const amount = req.body.amount
  // console.log(amount)
  // console.log(JSON.stringify({ amount: amount }));
  const id = req.body.id
  console.log(id)

  if (req.method === "POST") {
    try {
      const response = await fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData });
      } else {
        const responseData = await response.json();

        res.status(200).json({ success: true, responseData });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "This method is not allowed" });
  }
}

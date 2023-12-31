export default async function handler(req, res) {

    console.log(req.query);
  if (req.method === "GET") {
    try {
        const { id } = req.query;
       const response = await fetch(
         `https://stg.dhunjam.in/account/admin/${id}`
       );

      if (!response.ok) {
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData });
      } else {
        const responseData = await response.json();

        // console.log(responseData);
        res.status(200).json({ success: true, responseData: responseData });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "This method is not allowed" });
  }
}

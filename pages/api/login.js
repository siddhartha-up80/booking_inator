export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        `https://stg.dhunjam.in/account/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "DJ@4", password: "Dhunjam@2023" }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData });
      } else {
        const responseData = await response.json();
        const token = responseData.data.token;

        res.status(200).json({ success: true, token });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(404).json({ error: "This method is not allowed" });
  }
}

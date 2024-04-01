const sendNotification = async (
  token: string[],
  title: string,
  body?: string,
  data?: string
) => {
  const response = await fetch(
    "https://exp.host/--/api/v2/push/send?useFcmV1=true",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: data || {},
      }),
    }
  );
  const { status } = response;
  return status;
};

export { sendNotification };

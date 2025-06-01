describe('Reservations', () => {
  let jwt: any;
  beforeAll(async () => {
    const user = {
      email: 'mohamed1alasby@gmail.com',
      password: '123456789aA!',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const cookieHeader = response.headers.get('set-cookie');
    jwt = cookieHeader?.match(/Authentication=(.*?);/)?.[1];

    // const jwt = await response.text();
    // console.log(jwt);

    //test where the jwt
    // console.log('Status:', response.status);
    // console.log('Headers:', [...response.headers.entries()]);
  });

  test('Create & Get', async () => {
    const createreservations = await Createreservations();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createreservations._id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
      },
    );
    expect(responseGet.ok).toBeTruthy();
  });

  const Createreservations = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify({
          startDate: '2-5-2025',
          endDate: '12-5-2025',
          placeId: '12345',
          charge: {
            amount: 77,
          },
        }),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});

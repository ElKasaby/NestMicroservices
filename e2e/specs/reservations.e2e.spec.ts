describe('Reservations', () => {
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
    const jwt = await response.text();
    console.log(jwt);
  });

  test('Create', () => {
    expect(true).toBeTruthy();
  });
});

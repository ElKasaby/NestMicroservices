describe("Reservations", () => {
    beforeAll(async ()=> {
        const user = {
            email: "mohamed1alasby@gmail.com",
            password: "123456789aA!"
        }
        await fetch("http://auth:3001",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    })

    test("Create",() => {

    })
});
import { Form } from "@remix-run/react";

export default function SignUp() {
  return (
    <div>
      <Form className="flex flex-col" id="sign-up-form" method="post">
        <label htmlFor="firstname">Firstname</label>
        <input
          id="firstname"
          type="text"
          name="firstname"
          aria-label="firstname"
          placeholder="Type your firstname..."
          autoComplete="off"
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          id="lastname"
          type="text"
          name="lastname"
          aria-label="lastname"
          placeholder="Type your lastname..."
          autoComplete="off"
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          aria-label="address"
          placeholder="City, Country..."
          autoComplete="off"
        />

        <label htmlFor="languages">Languages</label>
        <input
          id="languages"
          type="text"
          name="languages"
          aria-label="languages"
          placeholder="Type the languages you speak..."
          autoComplete="off"
        />

        <fieldset>
          <legend>Gender:</legend>
          <input type="radio" id="male" name="gender" value="Male" />
          <label htmlFor="male">Male</label>
          <br />
          <input type="radio" id="female" name="gender" value="Female" />
          <label htmlFor="female">Female</label>
          <br />
          <input type="radio" id="other" name="gender" value="Other" />
          <label htmlFor="other">Other</label>
        </fieldset>

        <label htmlFor="mail">Mail</label>
        <input
          id="mail"
          type="email"
          name="mail"
          aria-label="mail"
          placeholder="Type your mail..."
          required
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
        />
        <div className="btns">
          <button type="submit">Sign Up</button>
        </div>
      </Form>
    </div>
  );
}

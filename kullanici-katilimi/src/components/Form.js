import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormGroup, FormFeedback, Input, Label } from "reactstrap";
const Form = () => {


  const formSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "en az 3 karakterden oluşmalı").required("Kullanıcı ismi boş bırakılamaz!"),
    age: Yup.number().positive(),
    email: Yup.string().email("geçerli bir mail adresi giriniz").required("Mail adresi boş bırakılamaz!"),
    password: Yup.string().required("Lütfen bir şifre giriniz!"),
    terms: Yup.boolean().oneOf([true], "onaylamadınız")
  });
  const [valid, setValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState({
    firstname: "",
    age: "",
    email: "",
    password: "",
    terms: false
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    age: "",
    email: "",
    password: "",
    terms: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validate(name,value)
  };

  const checkboxHandler = (e) => {
    const { name, checked } = e.target;
    setFormState({ ...formState, [name]: checked });
  };
  const validate = (name, value) => {
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (valid) {
      axios.post(
        "https://reqres.in/api/users",
        formState
      ).then((res) => {
        setUsers([...users, res.data])
      })

    }

  };
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setValid(valid));
  }, [formState]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="user-mail">Name</Label>
          <Input
            type="text"
            name="firstname"
            data-cy="name-input"
            id="firstname"
            placeholder=""
            onChange={handleChange}
            value={formState.firstname}
            invalid={!!formErrors.firstname}
          />
          <FormFeedback>{formErrors.firstname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="user-mail">Age</Label>
          <Input
            type="number"
            name="age"
            id="age"
            data-cy="age-input"
            placeholder=""
            onChange={handleChange}
            value={formState.age}
            invalid={!!formErrors.age}
          />
          <FormFeedback>{formErrors.age}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="user-mail">Email</Label>
          <Input
            type="email"
            name="email"
            id="user-mail"
            data-cy="mail-input"
            placeholder="xxx@example.com"
            onChange={handleChange}
            value={formState.email}
            invalid={!!formErrors.email}
          />
          <FormFeedback>{formErrors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="user-mail">Password</Label>
          <Input
            type="password"
            name="password"
            data-cy="password-input"
            id="password"
            placeholder=""
            onChange={handleChange}
            value={formState.password}
            invalid={!!formErrors.password}
          />
          <FormFeedback>{formErrors.password}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="terms">Shipping Free:</Label>
          <Input
            type="checkbox"
            name="terms"
            data-cy="terms-input"
            id="terms"
            onChange={checkboxHandler}
            checked={formState.terms}
            invalid={!!formErrors.terms}
          />
          <FormFeedback>{formErrors.terms}</FormFeedback>
        </FormGroup>

        <Button data-cy="submit-btn" disabled={!valid} color="success">
          Gönder
        </Button>
      </form>
     
         {users.map(item => ( 
         <div key={item.id}>
          <p data-cy="firstname">Name: {item.firstname}</p>
         <p data-cy="age"> Age: {item.age}</p> 
         <p data-cy="email">Email: {item.email}</p> 
         <p data-cy="password">Password: {item.password}</p> 
        </div>
      ))}
     
     
    </div>
  )
}

export default Form
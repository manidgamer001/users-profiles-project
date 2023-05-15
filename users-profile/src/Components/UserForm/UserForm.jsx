import { useRef, useState } from "react";
import styles from "./UserForm.module.css";
import { setUser } from "../../services/users";

const UserForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const reRenderRef = useRef(0);

  const resetFields = () => {
    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setSuccessMsg("");
    setErrorMsg("");
  };

  const showSuccessMsg = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  const showErrorMsg = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };

  const isValidate = () => {
    // specific form validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const validations = [
      {
        isValid: !fname,
        errorMsg: "Please enter the first name",
        refElem: fnameRef,
      },
      {
        isValid: fname.length < 3,
        errorMsg: "Please enter atleast three characters",
        refElem: fnameRef,
      },
      {
        isValid: !lname,
        errorMsg: "Please enter the last name",
        refElem: lnameRef,
      },
      {
        isValid: lname.length < 3,
        errorMsg: "Please enter atleast three characters in lastname",
        refElem: lnameRef,
      },
      {
        isValid: !email,
        errorMsg: "Please enter email address",
        refElem: emailRef,
      },
      {
        isValid: !emailRegex.test(email),
        errorMsg: "Please enter valid email address",
        refElem: emailRef,
      },
      {
        isValid: !mobile,
        errorMsg: "Please enter mobile number",
        refElem: mobileRef,
      },
      {
        isValid: mobile.length !== 10,
        errorMsg: "Please enter valid mobile number",
        refElem: mobileRef,
      },
    ];

    for (const validate of validations) {
      if (validate.isValid) {
        showErrorMsg(validate.errorMsg);
        //focus code for error field //
        validate.refElem.current.focus();
        return false;
      }
    }

    /* if (!fname) {
      showErrorMsg("Please enter the first name");
      return false;
    } else if (fname.length < 3) {
      showErrorMsg("Please enter atleast three characters");
      return false;
    } else if (!lname) {
      showErrorMsg("Please enter the last name");
      return false;
    } else if (lname.length < 3) {
      showErrorMsg("Please enter atleast three characters in lastname");
      return false;
    } else if (!email) {
      showErrorMsg("Please enter email address");
      return false;
    } else if (!emailRegex.test(email)) {
      showErrorMsg("Please enter valid email address");
      return false;
    } else if (!mobile) {
      showErrorMsg("Please enter mobile number ");
      return false;
    } else if (mobile.length !== 10) {
      showErrorMsg("Please enter valid mobile number");
      return false;
    }
    */

    return true;
  };

  const createUserHandler = () => {
    // console.log("btn click");

    // generic form validation //
    //if (!(fname && lname && email && mobile)) {
    // showErrorMsg("Please enter all the required fields");
    // return; }

    if (!isValidate()) {
      return;
    }

    const user = {
      fname,
      lname,
      email,
      mobile,
    };
    setIsLoading(true);
    setUser(user)
      .then((data) => {
        // console.log(data);
        resetFields();
        setIsLoading(false);
        showSuccessMsg(
          `User has been successfully created with user id: ${data.id}`
        );
      })
      .catch(() => {
        setIsLoading(false);
        showErrorMsg("There is some error... please try again");
      });
  };

  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="fname">First Name</label>
        <input
          ref={fnameRef}
          className={styles.inputFields}
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lname">Last Name</label>
        <input
          ref={lnameRef}
          className={styles.inputFields}
          type="text"
          id="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email id</label>
        <input
          ref={emailRef}
          className={styles.inputFields}
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile Number</label>
        <input
          ref={mobileRef}
          className={styles.inputFields}
          type="number"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div>
        <button
          className={styles.inputFields}
          disabled={isLoading}
          onClick={createUserHandler}
        >
          Create User
        </button>

        <button onClick={resetFields}>Reset Form</button>

        {isLoading && <div>Loading....</div>}
        <div className={styles.errorMsg}>{errorMsg}</div>
        <div className={styles.successMsg}>{successMsg}</div>
      </div>
      <div>Re-rendering Count : {++reRenderRef.current}</div>
    </div>
  );
};
export default UserForm;

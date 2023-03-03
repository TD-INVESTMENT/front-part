import { useEffect, useState } from 'react' 
import classes from './MyStyle.module.css';
// localStorage.setItem('Login', '1');

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
  MDBCarousel,
  MDBCarouselItem,
  MDBFooter, MDBRow, MDBCol, MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBInput,
  MDBCheckbox,
  MDBBadge, MDBListGroup, MDBListGroupItem,
  MDBCardHeader,
  MDBSwitch,
  MDBSpinner,
  MDBInputGroup,
  MDBInputGroupElement,
  MDBInputGroupText
  
  } from 'mdb-react-ui-kit';

const FirstPage = () => {
const [signIn, setSignIn] = useState(false);
const [signUp, setSignUp] = useState(false);
const [trans, setTrans] = useState(false);
const [authLoading, setAuthLoading] = useState(false);
const [isAuth, setIsAuth] = useState(false);
const [token, setToken] = useState();
const [userId, setUserId] = useState();
const [verify, setVerify] = useState(false);
const [transferV, setTransferV] = useState(false);
const [transferP, setTransferP] = useState("");

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [userNameLogin, setUserNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [authLogOut, setAutoLogout] = useState();

  const [accountNo, setAccountNo] = useState('');
  const [bankName, setBankName ] = useState('');
  const [amountT, setAmountT] = useState('');
  const [amount, setAmount] = useState('');
  const [transferM, setTransferM] = useState(false);
  const [depoM, setDepoM] = useState(false);

  
  const tokenC = localStorage.getItem("token");
  const balance = localStorage.getItem("balance");
  const userNameM = localStorage.getItem("username");
  const verifyM = localStorage.getItem("verify");
  const accountNoS = localStorage.getItem("accountNo");
  const tEmail = localStorage.getItem("email");



  useEffect(() => {
    if(tokenC !== null) {
      setIsAuth(true);
      setAmount(balance);
      setUserName(userNameM);
    }
  
  }, [tokenC])

  const [contentState, setContentState] = useState(<p>Input Details</p>);
  let signUpform;
  let signInform;

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };



const signUpHandler = () => {
    console.log('sU');
    setSignUp(true);
    setSignIn(false);
    setContentState(<p>Welcome</p>);
}

const signInHandler = () => {
  console.log('sI');
    setSignUp(false);
    setSignIn(true);
    setContentState(<p>Login</p>);
}

function transHandler() {
  setTrans(true);
}
function transHandlerClose() {
  setTrans(false);
  console.log('rea')
}

function transMHandler() {
  setTransferM(true);
  setDepoM(false);
  setContentState(<p>Input Transfer Details!</p>);
}

function rtransMHandler() {
  setTransferM(false);
}

function depoMHandler() {
  setTransferM(false);
  setDepoM(true);
  setContentState(<p style={{ color: 'green'}}>Please Input Details</p>);
}

function rDepoMHandler() {
  setDepoM(false);
}

function transferHandle(event) {
  event.preventDefault();
console.log(amountT);
console.log(accountNo);
console.log(bankName);
console.log(transferV);

if(accountNo.trim() === '') {
  setContentState(<p className={classes.c5}>Input an Account Number</p>);
  return
}

if(bankName.trim() === '') {
  setContentState(<p className={classes.c5}>Input Bank Name</p>);
  return
}

if(amountT.trim() === '') {
  setContentState(<p className={classes.c5}>Input an Amount</p>);
  return
}

setContentState(<p>Please Wait.....</p>);


setAuthLoading(true);
  fetch('https://td-jade.vercel.app/verify/transfer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      amount: amountT,
      accountno: accountNo,
      bankname: bankName,
      transferpassword: transferV,
    })
  })
    .then(res => {
      if (res.status === 422) {
        setContentState(<p className={classes.c5}>Validation failed.</p>);
        setAuthLoading(false);
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        setContentState(<p className={classes.c5}>Could not authenticate you!</p>);
        setAuthLoading(false);
        throw new Error('Could not authenticate you!');
      }
      setAuthLoading(false);
      return res.json();
    }).then(resData => {
      setContentState(<p style={{ color: 'green'}}>Request sent, you will receive an email soon</p>);
      console.log(resData);
      setAmount('');
      setAuthLoading(false);
    })
    .catch(err => {
      setContentState(<p className={classes.c5}>Something went wrong!</p>);
      setAuthLoading(false);
    });
}

function depositHandler (event) {
event.preventDefault();
console.log(amount);

if(amount.trim() === '0.00') {
  setContentState(<p className={classes.c5}>Amount is Empty</p>);
  return
}
setAuthLoading(true);
  fetch('https://td-jade.vercel.app/verify/deposit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      amount: amount
    })
  })
    .then(res => {
      if (res.status === 422) {
        setContentState(<p className={classes.c5}>Validation failed.</p>);
        setAuthLoading(false);
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        setContentState(<p className={classes.c5}>Could not authenticate you!</p>);
        setAuthLoading(false);
        throw new Error('Could not authenticate you!');
      }
      setAuthLoading(false);
      return res.json();
    }).then(resData => {
      setContentState(<p style={{ color: 'green'}}>Request sent</p>);
      console.log(resData);
      setAmount('');
      setAuthLoading(false);
    })
    .catch(err => {
      setAuthLoading(false);
    });
}
let content = <p>Correct</p>;






//verify
function verifyHandler (event) {
  event.preventDefault();

 
   setAuthLoading(true);
  fetch('https://td-jade.vercel.app/verify/verify', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
    })
  })
    .then(res => {
      if (res.status === 422) {
        setContentState(<p className={classes.c5}>Validation failed.</p>);
        setAuthLoading(false);
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        setContentState(<p className={classes.c5}>Could not authenticate you!</p>);
        setAuthLoading(false);
        throw new Error('Could not authenticate you!');
      }
      setAuthLoading(false);
      return res.json();
    }).then(resData => {
      setContentState(<p style={{ color: 'green'}}>Please check your email for code</p>);
      setTransferV(true);
    })
    .catch(err => {
      setAuthLoading(false);
    });
};

















//login
function submitHandlerLogin (event) {
  event.preventDefault();
  setAuthLoading(true);

  const authData = {
    userNameLogin,
    passwordLogin,
  };
 
   setAuthLoading(true);
  fetch('https://td-jade.vercel.app/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: authData.passwordLogin,
      username: authData.userNameLogin,
    })
  })
    .then(res => {
      if (res.status === 422) {
        setContentState(<p className={classes.c5}>Validation failed.</p>);
        setAuthLoading(false);
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        setContentState(<p className={classes.c5}>Could not authenticate you!</p>);
        setAuthLoading(false);
        throw new Error('Could not authenticate you!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
        setIsAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        setUserId(resData.userId);
        setSignUp(false);
        setSignIn(false);
        setAmount(resData.bal);
      localStorage.setItem('token', resData.token);
      localStorage.setItem('balance', resData.bal);
      localStorage.setItem('auth-state', resData.userId);
      localStorage.setItem('username', resData.username);
      localStorage.setItem('email', resData.email);
      localStorage.setItem('verify', resData.verify);
      localStorage.setItem('accountNo', resData.accountNo);
      setContentState(<p></p>);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAuthLoading(false);
      //setAutoLogout(remainingMilliseconds);
    })
    .catch(err => {
      setContentState(<p className={classes.c5}>Invalid username or password</p>);
      console.log('err');
      console.log(err);
      setIsAuth(false);
      setAuthLoading(false);
      // this.setState({
      //   isAuth: false,
      //   authLoading: false,
      //   error: err
      // });
    });
};









//signUp
function submitHandlerSignUp (event) {
  event.preventDefault();

  if(name.trim().length === 0) {
    setContentState(<p className={classes.c5}>Name cannot be empty</p>);
    return;
  }
  if(userName.trim().length === 0) {
    setContentState(<p className={classes.c5}>userName cannot be empty</p>);
    return;
  }

  if(!email.includes('@') || !email.includes('.')) {
    setContentState(<p className={classes.c5}>Invalid email</p>);
    return;
  }

  if(password.trim() < 6) {
    setContentState(<p className={classes.c5}>Password must be greater than 6</p>);
    return;
  }

  if(password.trim() !== cPassword.trim()) {
    setContentState(<p className={classes.c5}>Password does not match</p>);
    return;
  }

  const authData = {
    name,
    userName,
    email,
    password,
  };
 
  //console.log(userData);









  setAuthLoading(true);
  fetch('https://td-jade.vercel.app/auth/signup', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      name: authData.name,
      username: authData.userName,
      accountNo: Math.round(Math.random() * (100000044440 - 700000044440) + 700000044440).toString()
    })
  })
    .then(res => {
      if (res.status === 422) {
        setContentState(<p className={classes.c5}>Validation failed, Email taken</p>);
        setAuthLoading(false);
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');console.log(res);
        setAuthLoading(false);
        setContentState(<p className={classes.c5}>Creating user failed</p>);

        throw new Error('Creating a user failed!');
      }
     
      return res.json();
    })
    .then(resData => {
      if (resData.message === 'Username Taken') {
        console.log('Error!');
        setContentState(<p className={classes.c5}>Username Taken</p>);
        setAuthLoading(false);
        return;
       //throw new Error('Username Taken!');
      }
      console.log(resData);
      setIsAuth(false); 
      setAuthLoading(false);
      setSignUp(false);
      setSignIn(true);
       setVerify(true);
       
       setContentState(<p className={classes.c5}>Please Login</p>);

      //this.props.history.replace('/');
    })
    .catch(err => {
      console.log(err);

        setIsAuth(false);
        setAuthLoading(false);
    });
};










function logoutHandler() {
  console.log(isAuth);
  setIsAuth(false); 
  setToken(false);
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  tEmail = '';
  const token = localStorage.getItem("token");
  
  //console.log(token);
};







if (signUp === true && isAuth === false) {
 signUpform = <><div className={classes.c4}>
     { contentState}
      <form onSubmit={submitHandlerSignUp}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form3Example1' label='Name' onChange={(e) => setName(e.target.value)}/>
        </MDBCol>
        <MDBCol>
          <MDBInput id='form3Example2' label='UserName' onChange={(e) => setUserName(e.target.value)}/>
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' onChange={(e) => setEmail(e.target.value)}/>
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' onChange={(e) => setPassword(e.target.value)}/>
      <MDBInput className='mb-4' type='password' id='form3Example6' label='Confirm Password' onChange={(e) => setcPassword(e.target.value)}/>

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form3Example5'
        label='Subscribe to our newsletter'
        defaultChecked
      />

{authLoading ? <div style={{ width: '100%' , textAlign: 'center'}}>
  <MDBSpinner role='status' color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div> : <MDBBtn type='submit' className='mb-4' block>
       SignUp
      </MDBBtn>}

      <div className='text-center'>
        <p>
          Already have an account? <a onClick={signInHandler} href='#!'>Login</a>
        </p>
        
      </div>
    </form></div>

{/* {verify && <div style={{ marginLeft: '5rem', marginRight: '5rem', marginTop: '5rem'}}>
<MDBRow className='row-cols-lg-auto g-0 align-items-center'>
  <p>Please input verification code sent to</p>  
  <MDBInput label='Example label' id='form1' type='text' />
  <span onClick={verifyHandler}><MDBBtn href='#'>Click</MDBBtn></span>
</MDBRow></div>} */}
</>
}







if (signIn === true && !isAuth){
  signInform = <div className={classes.c4}>
    { contentState}
      <form onSubmit={submitHandlerLogin}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput id='form3Example1' label='Username'  onChange={(e) => setUserNameLogin(e.target.value)}/>
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' onChange={(e) => setPasswordLogin(e.target.value)}/>

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form3Example5'
        label='Subscribe to our newsletter'
        defaultChecked
      />

{authLoading ? <div style={{ width: '100%' , textAlign: 'center'}}>
  <MDBSpinner role='status' color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div> : <MDBBtn type='submit' className='mb-4' block>
        Log in
      </MDBBtn> }

      <div className='text-center'>
        <p>
          Dont'have an account? <a onClick={signUpHandler} href='#!'>Register</a>
        </p>
        
      </div>
    </form></div>
}












    return  (
       <> 
       <MDBNavbar expand='lg' light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'><strong>| TD </strong>-Investment Bank</MDBNavbarBrand>  
                {
                  !isAuth ?
                  <div color='primary'> 
                    <span onClick={signUpHandler}><MDBBtn className='me-1'>
       Sign Up
      </MDBBtn></span>
      
     

      <span onClick={signInHandler}><MDBBtn className='me-1' color='secondary'>
        Login
      </MDBBtn></span></div> : <div color='primary'> 
      <span onClick={logoutHandler}><MDBBtn className='me-1' color='secondary'>
        Logout
      </MDBBtn></span></div>}
          </MDBContainer>
        
        </MDBNavbar>

    {/* {(isAuth && verifyM === '0') && <div><div className="p-3 mb-2 bg-danger bg-gradient text-white rounded-5">
      Your account is not verified, Click <strong onClick={verifyHandler}>here </strong>to verify</div>
      
      
      
      
      
      </div>} */}
    

    {signUpform}







    {signInform}












    




   




    { isAuth && <MDBCardText color='primary' className={classes.c11}>
   DashBoard</MDBCardText>}




    {(isAuth === true) && <div className={classes.c6}><MDBRow>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
          <MDBCardTitle>Account Name: {userName}</MDBCardTitle>
            <MDBCardTitle>Account Balance</MDBCardTitle>
            <MDBCardText>
             {`$${amount}`}
            </MDBCardText>
            <MDBBtn href='#'
            >Account no:  {accountNoS}</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <div className={classes.c7}/>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Transfer Money</MDBCardTitle>
            <MDBCardText>
              With supporting text below as a natural lead-in to additional content.
            </MDBCardText>
            <span onClick={transMHandler}><MDBBtn href='#'>Click</MDBBtn></span>
          </MDBCardBody>
        </MDBCard>

        
      </MDBCol>

      

    {(isAuth  && transferM) && <div className={classes.c4}>
    { contentState}
      <form onSubmit={transferHandle}>
      <MDBRow className='mb-4'>
        <MDBCol>
          <MDBInput type='number' id='form3Example9'  label='Account Number'  onChange={(e) => setAccountNo(e.target.value)}/>
        </MDBCol>
      </MDBRow>
      <MDBInput className='mb-4' type='text' id='form3Example40' label='Bank Name' onChange={(e) => setBankName(e.target.value)}/>
      <MDBInput className='mb-4' type='number' id='form3Example48' label='Amount' onChange={(e) => setAmountT(e.target.value)}/>
      {/* <MDBInput className='mb-4' type='number' id='form3Example49' label='Transfer Password' onChange={(e) => setTransferV(e.target.value)}/> */}
      
      {/* {authLoading ? <div style={{ width: '100%' , textAlign: 'center'}}>
  <MDBSpinner role='status' color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div> : <span onClick={verifyHandler}><MDBBtn href='#'>
        Receive transport password by email now</MDBBtn></span>} */}
      <div style={{ marginTop: '1rem'}} />


      {authLoading ? <div style={{ width: '100%' , textAlign: 'center'}}>
  <MDBSpinner role='status' color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div> : <MDBBtn type='submit' className='mb-4' block>
        Request Transfer
      </MDBBtn>}
      <span onClick={rtransMHandler}><MDBBtn type='submit' className='mb-4' block>
        Close
      </MDBBtn></span>
      
    </form></div>}

      <div className={classes.c7}/>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Deposit Money</MDBCardTitle>
            <MDBCardText>
              With supporting text below as a natural lead-in to additional content.
            </MDBCardText>
            <span onClick={depoMHandler}><MDBBtn className='mb-4' block>
        Request Deposit
      </MDBBtn></span> 
          </MDBCardBody>
        </MDBCard>

        
      </MDBCol>
    </MDBRow>
    </div>}
    
















{(isAuth  && depoM) && <div className={classes.c4}>
      <div className={classes.c4}>
    { contentState}
      <form onSubmit={depositHandler}>

      <MDBInput className='mb-4' type='number' id='form3Example48' value={amount} label='Input Amount' onChange={(e) => setAmount(e.target.value)}/>
      
      {authLoading ? <div style={{ width: '100%' , textAlign: 'center'}}>
  <MDBSpinner role='status' color='primary'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner></div> : <MDBBtn type='submit'>
        Submit Request</MDBBtn>}
        {(amount === '' || amount === '0.00') ? <span style={{ paddingLeft: '2px'}} onClick={rDepoMHandler}><MDBBtn type='submit'>
        Close</MDBBtn></span> : ''}

      <div style={{ marginTop: '1rem'}} />


      
    </form></div>



    </div>} 

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   






       {!isAuth && 
      
      <MDBCarousel  showIndicators>
      <p className={classes.c10}>At TD Investment Bank, we pride ourselves on our commitment to excellence 
        and our focus on customer satisfaction. We are dedicated to providing our 
        clients with the highest level of service and support, and we are constantly 
        striving to improve and enhance our offerings to meet the evolving needs of 
        our clients.</p>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://mdbootstrap.com/img/new/slides/041.jpg'
        alt='...'
      >
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://mdbootstrap.com/img/new/slides/042.jpg'
        alt='...'
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://mdbootstrap.com/img/new/slides/043.jpg'
        alt='...'
      >
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselItem>
    </MDBCarousel>
      
      }





{  tEmail === 'richardgraythom@gmail.com' ? <div className={classes.c8}>
    <h2>Transaction History</h2>
    <MDBListGroup style={{ minWidth: '22rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>John Doe</div>
          <div className='text-muted'>john.doe@gmail.com</div>
        </div>
        <MDBBadge pill light color='success'>
          Success
        </MDBBadge>
      </MDBListGroupItem>


      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>John Doe</div>
          <div className='text-muted'>john.doe@gmail.com</div>
        </div>
        <MDBBadge pill light color='success'>
          Success
        </MDBBadge>
      </MDBListGroupItem>



      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>John Doe</div>
          <div className='text-muted'>john.doe@gmail.com</div>
        </div>
        <MDBBadge pill light color='success'>
          Success
        </MDBBadge>
      </MDBListGroupItem>


      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>Alex Ray</div>
          <div className='text-muted'>alex.ray@gmail.com</div>
        </div>
        <MDBBadge pill light color='primary'>
          Pending
        </MDBBadge>
      </MDBListGroupItem>


      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>Kate Hunington</div>
          <div className='text-muted'>kate.hunington@gmail.com</div>
        </div>
        <MDBBadge pill light color='warning'>
         Canceled
        </MDBBadge>
      </MDBListGroupItem>


      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>John Doe</div>
          <div className='text-muted'>john.doe@gmail.com</div>
        </div>
        <MDBBadge pill light color='success'>
          Success
        </MDBBadge>
      </MDBListGroupItem> 


      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>Kate Hunington</div>
          <div className='text-muted'>kate.hunington@gmail.com</div>
        </div>
        <MDBBadge pill light color='warning'>
         Canceled
        </MDBBadge>
      </MDBListGroupItem>
    </MDBListGroup>
   </div>  :    
   
   
   
   
   ''
   
   }



{  tEmail !== 'richardgraythom@gmail.com' && isAuth ? <div className={classes.c8}>
    <h2>Transaction History</h2>
    <MDBListGroup style={{ minWidth: '22rem' }} light>

      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div>
          <div className='fw-bold'>No Transaction</div>
        </div>
        <MDBBadge pill light color='success'>
          0
        </MDBBadge>
      </MDBListGroupItem>

    </MDBListGroup>
   </div> : ''}








<p className={classes.c2}>Choose what's right for you</p>


    


    <div className={classes.c1}><MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://i.ibb.co/yXXkQ6Z/logo192.png'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Limited-time: Get $300 when you open a Business Complete Checking account. Qualifying activities apply.</MDBCardTitle>
            <MDBCardText>
              
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
            <small className='text-muted'>$300 for new business checking customers</small>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/043.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Home lending</MDBCardTitle>
            <MDBCardText>
              You deserve this opportunity to be locked in a low interest rate when you
              refinance or buy your new home - and we can help.
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
            <small className='text-muted'>You maybe eligible for a low mortage rate</small>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard className='h-100'>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/042.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Chase Auto</MDBCardTitle>
            <MDBCardText>
              Use our online tools to shop and explore financing  for your next car  from the comfort of your home
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter>
            <small className='text-muted'>Shop finance abnd manage in one spot</small>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow></div>






    <div className={classes.c1}><MDBRow className='row-cols-1 row-cols-md-3 g-4'>
    <MDBRow className={`g-0 ${classes.c9}`}>
    <MDBCard alignment='center'>
      <MDBCardHeader>Depositing checks is a snap</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Checks quick deposite lets you easily deposite your checks from
              virtually anywhere.</MDBCardTitle>
        <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
        {/* <MDBBtn href='#'>Button</MDBBtn> */}
      </MDBCardBody>
      <MDBCardFooter className='text-muted'>Sign Up with us</MDBCardFooter>
    </MDBCard>
        {/* <MDBCol md='4'>
          <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>Depositing checks is a snap</MDBCardTitle>
            <MDBCardText>
              Checks quick deposite lets you easily deposite your checks from
              virtually anywhere.
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>Sign Up with us</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol> */}
        
        
      </MDBRow>

      <MDBRow className={`g-0 ${classes.c9}`}>
      <MDBCard alignment='center'>
      <MDBCardHeader>Explore the business resource center</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Find articles, videos and more to help you start, manage and grow your business.</MDBCardTitle>
        <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
        {/* <MDBBtn href='#'>Button</MDBBtn> */}
      </MDBCardBody>
      <MDBCardFooter className='text-muted'>Contact us</MDBCardFooter>
    </MDBCard>
        {/* <MDBCol md='4'>
          <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>Explore the business resource center</MDBCardTitle>
            <MDBCardText>
              Find articles, videos and more to help you start, manage and grow your business.
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>Contact us</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol> */}
        
        
      </MDBRow>

      <MDBRow className={`g-0 ${classes.c9}`}>
<MDBCard alignment='center'>
      <MDBCardHeader>New BrandName checking customers</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Enjoy $100 when you Open a BrandName Banking  account with qualifying activities.</MDBCardTitle>
        <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
        {/* <MDBBtn href='#'>Button</MDBBtn> */}
      </MDBCardBody>
      <MDBCardFooter className='text-muted'>Contact us</MDBCardFooter>
    </MDBCard>
        {/* <MDBCol md='4'>
          <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>New BrandName checking customers</MDBCardTitle>
            <MDBCardText>
              Enjoy $100 when you Open a BrandName Banking  account with qualifying activities.
            </MDBCardText>
            <MDBCardText>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
          </MDBCardBody>
        </MDBCol> */}
        
        
      </MDBRow>
      

    </MDBRow></div>














<div style={{ width: '100%' , marginLeft: '1rem', marginRight: '1rem'}}>
      <MDBListGroup style={{ minWidth: '22rem' }} light className='mb-3'>
        <MDBListGroupItem>
          <h5 className='fw-bold'>Our company started its operations</h5>
          <p className='text-muted mb-2 fw-bold'>11 March 2020</p>
          <p className='text-muted mb-0' style={{ width: '95%'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit necessitatibus adipisci, ad alias,
            voluptate pariatur officia repellendus repellat inventore fugit perferendis totam dolor voluptas
            et corrupti distinctio maxime corporis optio?
          </p>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <h5 className='fw-bold'>First customer</h5>
          <p className='text-muted mb-2 fw-bold'>19 March 2020</p>
          <p className='text-muted mb-0' style={{ width: '95%'}}>
            Quisque ornare dui nibh, sagittis egestas nisi luctus nec. Sed aliquet laoreet sapien, eget
            pulvinar lectus maximus vel. Phasellus suscipit porta mattis.
          </p>
        </MDBListGroupItem>
        <MDBListGroupItem>
          <h5 className='fw-bold'>Our team exceeds 10 people</h5>
          <p className='text-muted mb-2 fw-bold'>24 June 2020</p>
          <p className='text-muted mb-0' style={{ width: '95%'}}>
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla
            ullamcorper arcu lacus, maximus facilisis erat pellentesque nec. Duis et dui maximus dui aliquam
            convallis. Quisque consectetur purus erat, et ullamcorper sapien tincidunt vitae.
          </p>
        </MDBListGroupItem>
      </MDBListGroup>
      {/* <MDBBtn outline rounded rippleColor='dark' color='dark' className='w-100'>
        View all
      </MDBBtn> */}
    </div>



























  












    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                TD Investment Bank
              </h6>
              <p>
              TD Investment Bank is a leading financial institution that offers a wide range of financial services to its clients. With a strong commitment to excellence and a customer-centric approach, TD Investment Bank has established itself as a trusted partner to businesses and individuals looking to achieve their financial goals.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Real Estate
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Housing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@tdinvestmentbank.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 534 034 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 743 925 65
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
        TD Investment Bank
        </a>
      </div>
    </MDBFooter>
</>
      );
}

export default FirstPage;
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Alert, AlertColor, Box, Button, Paper, Snackbar } from '@mui/material'
import TextField from '@mui/material/TextField';
import { getMyAddress, setMyAddress, updateMyAddress } from '../../components/marketplace/API';
import { fetchToken } from '../../components/marketplace/token';

function AddLocation() {

  const [address, setAddress] = useState({
    country: '',
    mobileNumber: 0,
    pincode: 0,
    flatDetails: '',
    landMark: '',
    town: ''
  })
  const [alertData, setAlertData] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [alertType, setalertType] = useState<AlertColor>("success" || "warning" || "info" || "error")
  const [myAddress, setmyAddress] = useState([])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const handleClick = async () => {
    try {
      const token = fetchToken()
      const res = await setMyAddress(token, address)
      setOpen(true)
      setAlertData("Your address successfully Added")
      setalertType("success")
      setAddress({
        country: '',
        mobileNumber: 0,
        pincode: 0,
        flatDetails: '',
        landMark: '',
        town: ''
      })
      history.back()
    } catch (error: any) {
      console.log(error)
      setOpen(true)
      setAlertData(`${error.response.data.message}`)
      setalertType("error")
    }
  }

  const handleClickUpdate = async () => {
    try {
      const token = fetchToken()
      const res = await updateMyAddress(token, address)
      setOpen(true)
      setAlertData("Your address successfully updated")
      setalertType("success")
      setAddress({
        country: '',
        mobileNumber: 0,
        pincode: 0,
        flatDetails: '',
        landMark: '',
        town: ''
      })
      history.back()
    } catch (error: any) {
      console.log(error)
      setOpen(true)
      setAlertData(`${error.response.data.message}`)
      setalertType("error")
    }
  }

  const fetch = async () => {
    try {
      const token = fetchToken()
      const res = await getMyAddress(token)
      const data = res.data.data.data
      setmyAddress(data)
      console.log("data: ", data.length)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen flex flex-col justify-start items-center max-w-md`,
    nav: `h-20 w-full bg-pearl flex justify-start items-center p-3`,
    inputBg: `rounded-lg drop-shadow-xl border-1`,
    text: `text-3sm font-semibold mt-5`,
    input: `w-full h-full rounded-lg p-1 focus:outline-none `,
    btn: `border-2 bg-pearl capitalize text-black focus:bg-light-pearl drop-shadow-lg focus:drop-shadow-0.5lg`,
    bottomBox: `w-full h-8 mt-12 mb-10 flex justify-center items-center`
  }
  return (
    <Box className="w-screen flex justify-center items-center">

      <Box className={styles.page}>
        <Paper elevation={2} className={styles.nav} onClick={() => history.back()}>
          <ArrowBackIosIcon fontSize='small' />
          <span className='text-2sm font-semibold'>CANCEL</span>
        </Paper>
        <Box className="w-full flex flex-col p-5">
          <span className='font-semibold mb-10'>Edit your address</span>

          <select 
            name="pets" 
            id="pet-select" 
            required
            className="h-12 border-1 border-light-gray p-2 placeholder:text-light-gray focus:outline-none" 
            onChange={(e: any) => setAddress({...address, country: e.target.value})}>
            <option value="">Choose your country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote D'ivoire">{`Cote D'ivoire`}</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-bissau">Guinea-bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, Democratic People's Republic of">{`Korea, Democratic People's Republic of`}</option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao People's Democratic Republic">{`Lao People's Democratic Republic`}</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-leste">Timor-leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Virgin Islands, British">Virgin Islands, British</option>
            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>


          <span className={styles.text}>{`Mobile Number`}</span>
            <TextField 
              label="Mobile Number" 
              variant="filled" 
              fullWidth
              size='small'
              name='phone'
              onChange={(e: any) => setAddress({...address, mobileNumber: e.target.value})}
              required
            />

          <span className={styles.text}>{`Pincode`}</span>
          <TextField 
            label="Pincode" 
            variant="filled" 
            fullWidth
            size='small'
            name='pincode'
            onChange={(e: any) => setAddress({...address, pincode: e.target.value})}
            required
          />

          <span className='text-2sm font-semibold mt-5'>{`Flat, House no., Building Company, Apartment`}</span>
          <TextField 
            label="House no." 
            variant="filled" 
            fullWidth
            size='small'
            name='house no'
            onChange={(e: any) => setAddress({...address, flatDetails: e.target.value})}
            required
          />

          <span className={styles.text}>{`Landmark`}</span>
          <TextField 
            label="Landmark" 
            variant="filled" 
            fullWidth
            size='small'
            name='land mark'
            onChange={(e: any) => setAddress({...address, landMark: e.target.value})}
            required
          />

          <span className={styles.text}>{`Town/City`}</span>
          <TextField 
            label="Town/City" 
            variant="filled" 
            fullWidth
            size='small'
            name='town'
            onChange={(e: any) => setAddress({...address, town: e.target.value})}
            required
          />

          <Box className={styles.bottomBox}>
            {
              myAddress.length > 0 ?
              <Button 
              variant='outlined' 
              className={styles.btn} 
              onClick={handleClickUpdate}>
                {`Update Address`}
            </Button> :
            <Button 
              variant='outlined' 
              className={styles.btn} 
              onClick={handleClick}>
                {`Deliver to this address`}
            </Button>
            }
          </Box>

        </Box>
        <Box>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert 
              onClose={handleClose} 
              variant="filled" 
              // severity={alertData.length > 1 ? "warning" : "success"} 
              severity={alertType}
              sx={{ width: '100%' }}
            >
              {/* {alertData.length > 1 ? alertData : "Your Item added successfully to the cart"} */}
              {alertData}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  )
}

export default AddLocation
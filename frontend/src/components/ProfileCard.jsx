import { Card, CardActions, CardContent, Button, Typography, TextField, Container, Grid, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { getInfo } from '../utilities';




const ProfileCard = () => {
  const [formData, setFormData] = useState({first_name:'', last_name:'', email:'', birth_date:'', bio:'', address: {street:'', city:'', state:'', zip_code:''}}); 
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);  


  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];


  const handleStateChange = (evt) => {
    const selectedState = evt.target.value;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, state: selectedState }
    }));
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    if (name in formData.address) {
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [name]: value } 
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = () => {
    const updatedUser = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      birth_date: formData.birth_date,
      bio: formData.bio,
      address: formData.address
  };

    console.log('Saving to localStorage:', updatedUser);
    localStorage.setItem(formData.email, JSON.stringify(updatedUser));
    setUser(updatedUser);
    setFormData(updatedUser);
    toggleEdit(); 
    console.log('Updated user profile:', updatedUser);
    console.log(user);
  };

  const handleCancel = () => {
    setFormData({...formData});
    toggleEdit();
  }

  useEffect(() => {
    const getUserData = async () => {
      const userEmail = formData.email;
      const savedUser = localStorage.getItem(userEmail);
      console.log('Saved user in localStorage:', savedUser);

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log("Parsed user data:", parsedUser);
  
          if (parsedUser) {
            setFormData({
              first_name: parsedUser.first_name || '',
              last_name: parsedUser.last_name || '',
              email: parsedUser.email || '',
              birth_date: parsedUser.birth_date || '',
              bio: parsedUser.bio || '',
              address: {
                street: parsedUser.address?.street || '',
                city: parsedUser.address?.city || '',
                state: parsedUser.address?.state || '',
                zip_code: parsedUser.address?.zip_code || ''
              }
            });
          }
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
        }
          } else {
        const userInfo = await getInfo();
        console.log(await getInfo());
        console.log("getInfo user data:", userInfo)
        if (userInfo) {
          const { first_name, last_name, email, birth_date, address, bio } = userInfo;
          setUser(userInfo);
          setFormData({
            first_name,
            last_name,
            email,
            birth_date,
            bio,
            address: {
              street: address?.street || '',
              city: address?.city || '',
              state: address?.state || '',
              zip_code: address?.zip_code || ''
            }
          });
        }
      }
    };
      getUserData();
  }, [formData.email]);


  useEffect(() => {
    console.log(formData);
  }, [formData]);


  return ( 
    <>
    <Container>
      <Card sx={{ maxWidth: 900 }}>
        <CardContent>
          {edit ? (
            <>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Street"
                name="street"
                value={formData.address.street}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="State"
                  name="state"
                  value={formData.address.state}
                  onChange={handleStateChange}
                  select
                  sx={{ width: '200px' }}
                  margin="normal"
                >
                  {states.map((state) => (
                    <MenuItem key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Zipcode"
                  name="zip_code"
                  value={formData.address.zip_code}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
              <TextField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
              />
            </>
          ) : (
            <>
              <Typography gutterBottom variant="h5" component="div">
                {formData.first_name} {formData.last_name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {formData.email}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {formData.birth_date}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {`${formData.address?.street || ''}, ${formData.address?.city || ''}${formData.address?.city && formData.address?.state ? ', ' : ''}${formData.address?.state || ''}${formData.address?.state && formData.address?.zip_code ? ', ' : ''}${formData.address?.zip_code || ''}`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {formData.bio}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {edit ? (
           <>
            <Button size="small" onClick={handleSave}>
              Save
            </Button>
            <Button size='small' onClick={handleCancel}>
              Cancel
            </Button>
           </> 
          ) : (
            <Button size="small" onClick={toggleEdit}>
              Edit
            </Button>
          )}
          
        </CardActions>
      </Card>
    </Container>
    </>
  )
}

export default ProfileCard;
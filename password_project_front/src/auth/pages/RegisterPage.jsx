import { Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { checkingRegistration } from "../../store/endpoints";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Link as RouterLink} from "react-router-dom"

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [length, setLength] = useState(0);
    const [mayus, setMayus] = useState(false);
    const [minus, setMinus] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = () => {
        const registrationData = {
            username,
            length,
            mayus,
            minus,
            numbers,
            symbols,
        };

        dispatch(checkingRegistration(registrationData));
    };

    return (
        <AuthLayout title="Register">
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{mb: 2}}>
                        <TextField
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Grid>
                    <Grid container direction="column">
                        <Typography variant="h6" sx={{mr: 1}} >Generate Password:</Typography>
                        <FormControlLabel
                            control={<Checkbox checked={mayus} onChange={(e) => setMayus(e.target.checked)} />}
                            label="Upper case"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={minus} onChange={(e) => setMinus(e.target.checked)} />}
                            label="Lower case"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />}
                            label="Numbers"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />}
                            label="Symbols"
                        />
                        <TextField
                            label="Length"
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            style={{width: 120, mt: 10 }}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{mb:2, mt: 2}}>
                        <Grid container direction="row">
                            <Button variant='contained' fullWidth onClick={onSubmit}>Create account</Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent='end'>
                        <Typography variant="subtitle2" sx={{mr: 1}}>Already have an account?</Typography>
                        <Link component={ RouterLink } to="/auth/login" color="inherit">
                            Log in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

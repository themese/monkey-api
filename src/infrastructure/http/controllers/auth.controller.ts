import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import axios from "axios";

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {

  @ApiResponse({
    status: 200,
    description: 'Validates application using the test feautres from Auth0. Returns bearer token to use in the controllers'
  })
  @ApiResponse({
    status: 500,
    description: 'Something ocurred while loging the application. Please check the error message thrown'
  })
  @Get('/')
  async getToken(): Promise<string> {
    try {
      const res = await axios.post('https://dev-monkey.eu.auth0.com/oauth/token', {
        'client_id': process.env.AUTH0_CLIENT_ID,
        'client_secret': process.env.AUTH0_CLIENT_SECRET,
        'audience': process.env.AUTH0_AUDIENCE,
        'grant_type': 'client_credentials'
      }, {
        headers: { 'content-type': 'application/json' },
      });
      return res.data.access_token;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

  }
}
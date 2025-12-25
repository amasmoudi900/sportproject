import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
    // http://localhost:4200 => Home will be displayed
    { path: "", component: HomeComponent },
    // http://localhost:4200/signin => Login will be displayed
    { path: "signin", component: LoginComponent },
    // http://localhost:4200/signup => Signup will be displayed
    { path: "signup", component: SignupComponent },
    { path: "signupAdmin", component: SignupComponent },
    { path: "signupOwner", component: SignupComponent },
    { path: "addMatch", component: AddMatchComponent },
    { path: "addTeam", component: AddTeamComponent },
    { path: "addPlayer", component: AddPlayerComponent },
    { path: "admin", component: AdminComponent },
    { path: "matches", component: MatchesComponent },
    // matchInfo/:id => matchInfo/17
    // matchInfo/2
    // matchInfo/PARAM (:nomParam)
    { path: "matchInfo/:id", component: MatchInfoComponent },
    { path: "editMatch/:mId", component: EditMatchComponent },
    { path: "search", component: SearchMatchesComponent },
    { path: "addStadium", component: AddStadiumComponent },
    { path: "weather", component: WeatherComponent },
];

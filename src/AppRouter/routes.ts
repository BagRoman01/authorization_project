import ExamplePage from "../pages/ExamplePage/ExamplePage"
import { FC } from 'react';
import ProfilePage from "../pages/ProfilePage/ProfilePage";



// Define a type for the route object
export interface RouteType {
  path: string;
  component: FC;
}

export const privateRoutes: RouteType[] = [
    {path: '/profile', component: ProfilePage },
]

export const publicRoutes: RouteType[] = [
  { path: '/ExamplePage', component: ExamplePage },
];

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { config } from '../fire-config';

const fire = firebase.initializeApp(config);

export default fire;
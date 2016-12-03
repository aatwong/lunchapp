
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  is_active BOOLEAN NOT NULL DEFAULT false,
  email varchar(50),  --NOT SURE HOW LONG TO MAKE THIS STACK OVERFLOW SAID 89 WAS THE LONGEST
  display_name varchar(255),
  password varchar(255),                      --use BCrypt password hashing
  office_fk INTEGER REFERENCES office (id),   --IS THIS AN INT OR VARCHAR?  NOT NULL?
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,  --NOT sure if this type syntax IS RIGHT
  modified_at TIMESTAMP WITH TIME zone DEFAULT CURRENT_TIMESTAMP --NOT sure if this type syntax IS RIGHT
);

CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  event_start TIMESTAMP WITH TIME zone,
  restaurant varchar(255) NULL,
  notes text NULL,
  metting_place varchar(255),
  will_deliver BOOLEAN DEFAULT false, --changed the name
  host_user_id_fk INTEGER REFERENCES users (id), --this is the host (person who makes the event)
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,  --NOT sure if this type syntax IS RIGHT
  modified_at TIMESTAMP WITH TIME zone DEFAULT CURRENT_TIMESTAMP --NOT sure if this type syntax IS RIGHT
);

CREATE TABLE office_event (
  id SERIAL PRIMARY KEY,
  office_id_fk INTEGER REFERENCES office (id),
  event_id_fk INTEGER REFERENCES event (id),
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,  --NOT sure if this type syntax IS RIGHT
  modified_at TIMESTAMP WITH TIME zone DEFAULT CURRENT_TIMESTAMP --NOT sure if this type syntax IS RIGHT
);

CREATE TABLE event_contact (
  id SERIAL PRIMARY KEY,
  event_id_fk INTEGER REFERENCES event (id),
  user_id_fk INTEGER REFERENCES users (id),
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,  --NOT sure if this type syntax IS RIGHT
  modified_at TIMESTAMP WITH TIME zone DEFAULT CURRENT_TIMESTAMP --NOT sure if this type syntax IS RIGHT
);


CREATE TABLE event_attendee (
  id SERIAL PRIMARY KEY,
  event_id_fk INTEGER REFERENCES event (id),
  user_id_fk INTEGER REFERENCES users (id),
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,
  modified_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,
  UNIQUE (event_id_fk, user_id_fk)
);

CREATE TABLE comment (
  id serial PRIMARY KEY,
  message text,
  event_id_fk INTEGER REFERENCES event (id),
  user_id_fk INTEGER REFERENCES users (id),
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,
  modified_at TIMESTAMP WITH TIME zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE session (
  id serial,
  token varchar(255),
  user_id_fk INTEGER REFERENCES users (id),
  expiration_date TIMESTAMP WITH TIME zone NULL,
  created_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,
  modified_at TIMESTAMP WITH TIME zone DEFAULT current_timestamp,
  PRIMARY KEY(id, token)
);

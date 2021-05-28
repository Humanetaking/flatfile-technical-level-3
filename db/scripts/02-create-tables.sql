CREATE TABLE sections (
    id serial PRIMARY KEY,
    title text NOT NULL
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    title text NOT NULL,
    section_id serial,
    board_id serial
);

-- I decide not put the unique constraint on table name.
-- If we were to add the concept of teams, the boards would be unique to a team/organization
CREATE TABLE boards (
    id serial PRIMARY KEY,
    title text NOT NULL
)
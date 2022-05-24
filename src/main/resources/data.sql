INSERT INTO ROLE(role_id, name) VALUES(1, "ROLE_ADMIN");
INSERT INTO ROLE(role_id, name) VALUES(2, "ROLE_USER");

Insert into user(username, password) values ('admin', '$2a$12$RVQGH9lQiUj5kEwdGNgotuYP2JDu6P7VCZZDnNCTdOkDXntsPKc96');
insert into user_role(user_id, role_id) values (1,1)

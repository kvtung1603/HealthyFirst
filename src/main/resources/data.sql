INSERT INTO ROLE(role_id, name) VALUES(1, "ROLE_ADMIN");
INSERT INTO ROLE(role_id, name) VALUES(2, "ROLE_USER");


Insert into user(username, password, status, email)
values ('admin', '$2a$12$RVQGH9lQiUj5kEwdGNgotuYP2JDu6P7VCZZDnNCTdOkDXntsPKc96', 'ACTIVE', 'admin@gmail.com');
insert into user_role(user_id, role_id) values (1,1);

Insert into user(username, password, status, email)
values ('user1', '$2a$12$RVQGH9lQiUj5kEwdGNgotuYP2JDu6P7VCZZDnNCTdOkDXntsPKc96', 'NEW', 'user2@gmail.com');

Insert into user(username, password, status, email)
values ('user2', '$2a$12$RVQGH9lQiUj5kEwdGNgotuYP2JDu6P7VCZZDnNCTdOkDXntsPKc96', 'ACTIVE', 'user1@gmail.com');

insert into user_role(user_id, role_id) values (3,2);

insert into user_role(user_id, role_id) values (2,2);

insert into store(address, name, phone, type, user_id) values
    ('address 1', 'name 1', '0123456789', 'RESTAURANT', 2);

insert into store(address, name, phone, type, user_id) values
    ('address 2', 'name 2', '0123456789', 'RESTAURANT', 2);

insert into store(address, name, phone, type, user_id) values
    ('address 3', 'name 3', '0123456789', 'MANUFACTURING', 3);

insert into inspection(inspection_id, name, result, status, store_id)
values (2, 'store 1','null', 'INPROCESS', 2);

insert into inspection(inspection_id, name, result, status, store_id)
values (1, 'store 1','null', 'PENDING', 1);

insert into certificate(certificate_id, dated, expiry_date, store_id)
values (1, '2021-01-01', '2025-01-01', 1);

insert into certificate(certificate_id, dated, expiry_date, store_id)
values (2, '2021-01-01', '2025-01-01', 2);








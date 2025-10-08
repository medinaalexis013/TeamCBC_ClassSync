--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: classsync; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA classsync;


ALTER SCHEMA classsync OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course_major_requirement; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.course_major_requirement (
    course_id integer NOT NULL,
    major_id integer NOT NULL,
    criteria character varying(50)
);


ALTER TABLE classsync.course_major_requirement OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.courses (
    course_id integer NOT NULL,
    department_id integer NOT NULL,
    course_num character varying(10) NOT NULL,
    description character varying(500),
    units integer
);


ALTER TABLE classsync.courses OWNER TO postgres;

--
-- Name: courses_course_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.courses_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.courses_course_id_seq OWNER TO postgres;

--
-- Name: courses_course_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.courses_course_id_seq OWNED BY classsync.courses.course_id;


--
-- Name: departments; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.departments (
    department_id integer NOT NULL,
    name character varying(100),
    description character varying(500),
    abbreviation character varying(10) NOT NULL
);


ALTER TABLE classsync.departments OWNER TO postgres;

--
-- Name: departments_department_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.departments_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.departments_department_id_seq OWNER TO postgres;

--
-- Name: departments_department_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.departments_department_id_seq OWNED BY classsync.departments.department_id;


--
-- Name: majors; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.majors (
    major_id integer NOT NULL,
    name character varying(50),
    total_units_needed integer,
    department_id integer
);


ALTER TABLE classsync.majors OWNER TO postgres;

--
-- Name: majors_major_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.majors_major_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.majors_major_id_seq OWNER TO postgres;

--
-- Name: majors_major_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.majors_major_id_seq OWNED BY classsync.majors.major_id;


--
-- Name: prerequisites; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.prerequisites (
    desired_course_id integer NOT NULL,
    prerequisite_course_id integer NOT NULL,
    minimum_grade integer
);


ALTER TABLE classsync.prerequisites OWNER TO postgres;

--
-- Name: professors; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.professors (
    professor_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50),
    phone_number character varying(15)
);


ALTER TABLE classsync.professors OWNER TO postgres;

--
-- Name: professors_professor_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.professors_professor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.professors_professor_id_seq OWNER TO postgres;

--
-- Name: professors_professor_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.professors_professor_id_seq OWNED BY classsync.professors.professor_id;


--
-- Name: reviews; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.reviews (
    review_id integer NOT NULL,
    description character varying(500),
    rating integer,
    difficulty integer,
    date_posted date,
    professor_id integer,
    user_id integer,
    course_id integer
);


ALTER TABLE classsync.reviews OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.reviews_review_id_seq OWNER TO postgres;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.reviews_review_id_seq OWNED BY classsync.reviews.review_id;


--
-- Name: sections; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.sections (
    section_num integer NOT NULL,
    course_id integer NOT NULL,
    professor_id integer,
    student_capacity integer,
    room character varying(100),
    days_of_week integer,
    start_time integer,
    length integer
);


ALTER TABLE classsync.sections OWNER TO postgres;

--
-- Name: user_major_declaration; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.user_major_declaration (
    user_id integer NOT NULL,
    major_id integer NOT NULL,
    date_declared date
);


ALTER TABLE classsync.user_major_declaration OWNER TO postgres;

--
-- Name: user_section_registration; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.user_section_registration (
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    section_num integer,
    term integer NOT NULL,
    grade integer
);


ALTER TABLE classsync.user_section_registration OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: classsync; Owner: postgres
--

CREATE TABLE classsync.users (
    user_id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(50)
);


ALTER TABLE classsync.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: classsync; Owner: postgres
--

CREATE SEQUENCE classsync.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE classsync.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: classsync; Owner: postgres
--

ALTER SEQUENCE classsync.users_user_id_seq OWNED BY classsync.users.user_id;


--
-- Name: courses course_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.courses ALTER COLUMN course_id SET DEFAULT nextval('classsync.courses_course_id_seq'::regclass);


--
-- Name: departments department_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.departments ALTER COLUMN department_id SET DEFAULT nextval('classsync.departments_department_id_seq'::regclass);


--
-- Name: majors major_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.majors ALTER COLUMN major_id SET DEFAULT nextval('classsync.majors_major_id_seq'::regclass);


--
-- Name: professors professor_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.professors ALTER COLUMN professor_id SET DEFAULT nextval('classsync.professors_professor_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.reviews ALTER COLUMN review_id SET DEFAULT nextval('classsync.reviews_review_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.users ALTER COLUMN user_id SET DEFAULT nextval('classsync.users_user_id_seq'::regclass);


--
-- Data for Name: course_major_requirement; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.course_major_requirement (course_id, major_id, criteria) FROM stdin;
1	1	\N
2	1	\N
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.courses (course_id, department_id, course_num, description, units) FROM stdin;
1	1	491B	\N	3
2	1	491A	\N	3
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.departments (department_id, name, description, abbreviation) FROM stdin;
1	Computer Engineering and Computer Science	\N	CECS
2	Electrical Engineering	\N	EE
\.


--
-- Data for Name: majors; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.majors (major_id, name, total_units_needed, department_id) FROM stdin;
1	Computer Science	120	1
2	Computer Engineering	120	1
\.


--
-- Data for Name: prerequisites; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.prerequisites (desired_course_id, prerequisite_course_id, minimum_grade) FROM stdin;
1	2	\N
\.


--
-- Data for Name: professors; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.professors (professor_id, first_name, last_name, email, phone_number) FROM stdin;
1	Fahd	Albinali	\N	\N
2	Fei	Hoffman	\N	\N
3	Iftikhar	Shahnawaz	\N	\N
4	Frank	Murgolo	\N	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.reviews (review_id, description, rating, difficulty, date_posted, professor_id, user_id, course_id) FROM stdin;
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.sections (section_num, course_id, professor_id, student_capacity, room, days_of_week, start_time, length) FROM stdin;
3	1	1	30	\N	\N	\N	\N
\.


--
-- Data for Name: user_major_declaration; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.user_major_declaration (user_id, major_id, date_declared) FROM stdin;
1	1	\N
\.


--
-- Data for Name: user_section_registration; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.user_section_registration (user_id, course_id, section_num, term, grade) FROM stdin;
1	1	3	3	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: classsync; Owner: postgres
--

COPY classsync.users (user_id, first_name, last_name, email) FROM stdin;
1	Ana	Smith	Anasmith@gmail.com
\.


--
-- Name: courses_course_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.courses_course_id_seq', 2, true);


--
-- Name: departments_department_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.departments_department_id_seq', 2, true);


--
-- Name: majors_major_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.majors_major_id_seq', 2, true);


--
-- Name: professors_professor_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.professors_professor_id_seq', 4, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.reviews_review_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: classsync; Owner: postgres
--

SELECT pg_catalog.setval('classsync.users_user_id_seq', 1, true);


--
-- Name: course_major_requirement course_major_requirement_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.course_major_requirement
    ADD CONSTRAINT course_major_requirement_pk PRIMARY KEY (course_id, major_id);


--
-- Name: courses courses_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.courses
    ADD CONSTRAINT courses_pk PRIMARY KEY (course_id);


--
-- Name: departments departments_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.departments
    ADD CONSTRAINT departments_pk PRIMARY KEY (department_id);


--
-- Name: majors majors_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.majors
    ADD CONSTRAINT majors_pk PRIMARY KEY (major_id);


--
-- Name: prerequisites prerequisites_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.prerequisites
    ADD CONSTRAINT prerequisites_pk PRIMARY KEY (desired_course_id, prerequisite_course_id);


--
-- Name: professors professors_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.professors
    ADD CONSTRAINT professors_pk PRIMARY KEY (professor_id);


--
-- Name: reviews reviews_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.reviews
    ADD CONSTRAINT reviews_pk PRIMARY KEY (review_id);


--
-- Name: sections section_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.sections
    ADD CONSTRAINT section_pk PRIMARY KEY (section_num, course_id);


--
-- Name: user_major_declaration user_major_declaration_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_major_declaration
    ADD CONSTRAINT user_major_declaration_pk PRIMARY KEY (user_id, major_id);


--
-- Name: user_section_registration user_section_registration_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_section_registration
    ADD CONSTRAINT user_section_registration_pk PRIMARY KEY (user_id, course_id, term);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: sections course_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.sections
    ADD CONSTRAINT course_fk FOREIGN KEY (course_id) REFERENCES classsync.courses(course_id);


--
-- Name: course_major_requirement course_major_requirement_courses_course_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.course_major_requirement
    ADD CONSTRAINT course_major_requirement_courses_course_id_fk FOREIGN KEY (course_id) REFERENCES classsync.courses(course_id);


--
-- Name: course_major_requirement course_major_requirement_majors_major_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.course_major_requirement
    ADD CONSTRAINT course_major_requirement_majors_major_id_fk FOREIGN KEY (major_id) REFERENCES classsync.majors(major_id);


--
-- Name: courses courses_departments_department_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.courses
    ADD CONSTRAINT courses_departments_department_id_fk FOREIGN KEY (department_id) REFERENCES classsync.departments(department_id);


--
-- Name: prerequisites desired_course_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.prerequisites
    ADD CONSTRAINT desired_course_id_fk FOREIGN KEY (desired_course_id) REFERENCES classsync.courses(course_id);


--
-- Name: majors majors_departments_department_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.majors
    ADD CONSTRAINT majors_departments_department_id_fk FOREIGN KEY (department_id) REFERENCES classsync.departments(department_id);


--
-- Name: prerequisites prerequisites_course_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.prerequisites
    ADD CONSTRAINT prerequisites_course_id_fk FOREIGN KEY (prerequisite_course_id) REFERENCES classsync.courses(course_id);


--
-- Name: reviews reviews_courses_course_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.reviews
    ADD CONSTRAINT reviews_courses_course_id_fk FOREIGN KEY (course_id) REFERENCES classsync.courses(course_id);


--
-- Name: reviews reviews_professors_professor_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.reviews
    ADD CONSTRAINT reviews_professors_professor_id_fk FOREIGN KEY (professor_id) REFERENCES classsync.professors(professor_id);


--
-- Name: reviews reviews_users_user_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.reviews
    ADD CONSTRAINT reviews_users_user_id_fk FOREIGN KEY (user_id) REFERENCES classsync.users(user_id);


--
-- Name: sections sections_professors_professor_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.sections
    ADD CONSTRAINT sections_professors_professor_id_fk FOREIGN KEY (professor_id) REFERENCES classsync.professors(professor_id);


--
-- Name: user_major_declaration user_major_declaration_majors_major_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_major_declaration
    ADD CONSTRAINT user_major_declaration_majors_major_id_fk FOREIGN KEY (major_id) REFERENCES classsync.majors(major_id);


--
-- Name: user_major_declaration user_major_declaration_users_user_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_major_declaration
    ADD CONSTRAINT user_major_declaration_users_user_id_fk FOREIGN KEY (user_id) REFERENCES classsync.users(user_id);


--
-- Name: user_section_registration user_section_registration_sections_section_num_course_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_section_registration
    ADD CONSTRAINT user_section_registration_sections_section_num_course_id_fk FOREIGN KEY (section_num, course_id) REFERENCES classsync.sections(section_num, course_id);


--
-- Name: user_section_registration user_section_registration_users_user_id_fk; Type: FK CONSTRAINT; Schema: classsync; Owner: postgres
--

ALTER TABLE ONLY classsync.user_section_registration
    ADD CONSTRAINT user_section_registration_users_user_id_fk FOREIGN KEY (user_id) REFERENCES classsync.users(user_id);


--
-- PostgreSQL database dump complete
--


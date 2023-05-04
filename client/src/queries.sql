create table bansos(
    bansos_id BIGINT not null primary key,
    nama_bansos CHAR(32),
    tgl1 DATE,
    tgl2 DATE,
    sesi ENUM('1', '2', '3')
);
create table data_warga(
    nkk BIGINT not null primary key,
    nama CHAR(32),
    alamat CHAR(64),
    tgl_claim DATE,
    sesi ENUM('1', '2', '3'),
    no_antre SMALLINT,
    status BOOL,
    bansos_id BIGINT not null,
    FOREIGN KEY (bansos_id) REFERENCES bansos(bansos_id)
);
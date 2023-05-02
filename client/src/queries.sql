create table data_warga(
    nkk INT(16) not null primary key,
    nama CHAR(32),
    alamat CHAR(64),
    tgl_claim DATE,
    sesi ENUM('1', '2', '3'),
    no_antre TINYINT,
    status BOOL
);
create table data_warga(
    nkk INT(16) not null primary key,
    nama CHAR(32),
    alamat CHAR(64),
    tgl_claim DATE,
    sesi ENUM('1', '2', '3'),
    no_antre TINYINT,
    status BOOL,
    bansos_id INT(12),
    FOREIGN KEY (bansos_id) REFERENCES bansos(bansos_id)
);
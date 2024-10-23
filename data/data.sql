
drop table if exists productos;
drop table if exists categorias;

drop table if exists usuarios;

CREATE TABLE usuarios (
   id INT  NOT NULL AUTO_INCREMENT,
   nombres VARCHAR(20) 	NOT NULL,
   apellidos VARCHAR(20) 	NOT NULL,
   email VARCHAR(40) 	NOT NULL,
   password VARCHAR(20) 	NOT NULL,
   isadmin boolean default false,
   PRIMARY KEY (id)
);

CREATE TABLE categorias (
   id INT  NOT NULL AUTO_INCREMENT,
   categoria VARCHAR(18) NOT NULL,
   ruta VARCHAR(18) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE productos (
   id INT  NOT NULL AUTO_INCREMENT,
   nombreproducto VARCHAR(100) 	NOT NULL,
   urlimagen VARCHAR(160),
   precio DECIMAL (18, 2),
   descripcion VARCHAR(100), 
   categoria_id int NOT NULL, 
   caracteristicas JSON  DEFAULT NULL,
   PRIMARY KEY (id),
   FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


insert into usuarios(nombres,apellidos,email,password,isadmin) values
('Luis Enrique','Fernandez Bardales','luis@gmail.com','1234',true);

insert into categorias(categoria,ruta) values
('Mobile','mobile'),
('TV & Audio','tv_audio'),
('Electrodomésticos','electrodomesticos'),
('Tecnología AI','tecnologia_ai'),
('Ventas Especiales','ventas_especiales');

insert into productos(nombreproducto,urlimagen,precio,descripcion,categoria_id)
values
('Combo Dual Music Frame"','https://images.samsung.com/is/image/samsung/p6pim/pe/f-hwls60dpe-01/gallery/pe-bundle-dual-music-frame--f-hwls60dpe-01-541782811?$650_519_PNG$',
1231.23,'Parlante',(select id from categorias where categoria='TV & Audio')
),
('Soundbar Samsung Wifi + Parlantes Posteriores 11.1.4 CH HW-Q990D (2024)','https://images.samsung.com/is/image/samsung/p6pim/pe/hw-q990d-pe/gallery/pe-q-series-soundbar-hw-q990d-hw-q990d-pe-542749790?$650_519_PNG$',
1231.23,'Parlante Bluetooth',(select id from categorias where categoria='TV & Audio')
),
('Galaxy Buds FE','https://images.samsung.com/is/image/samsung/p6pim/pe/sm-r400nzaalta/gallery/pe-galaxy-buds-fe-sm-r400nzaalta-538769511?$650_519_PNG$',
1231.23,'??',(select id from categorias where categoria='Tecnología AI')
),
('Galaxy S23','https://images.samsung.com/is/image/samsung/p6pim/pe/2302/gallery/pe-galaxy-s23-s918-sm-s918bzkvltp-thumb-534855456?imwidth=480',
1231.23,'sfasf',(select id from categorias where categoria='Mobile')
),
('IPad','https://pe.tiendasishop.com/cdn/shop/files/IMG-15323315_ef2186a0-dd37-4bd5-8be3-ad9c0d995618_550x.jpg?v=1729009748',
1231.23,'testast',(select id from categorias where categoria='Tecnología AI')
),
('Reloj','https://shop.samsung.com/latin/pub/media/catalog/product/cache/45eacecef37c2d34dea6bd1d0132e77c/s/m/sm-r390_000-all_thumb_1.png',
1231.23,'test',(select id from categorias where categoria='Ventas Especiales')
),
('TV','https://plazavea.vteximg.com.br/arquivos/ids/27596514-300-300/20377862.jpg?v=638320037713330000',
1231.23,'text',(select id from categorias where categoria='TV & Audio')
),
('Refrigerador','https://images.samsung.com/is/image/samsung/p6pim/pe/rs52b3000m9-pe/gallery/pe-side-by-side-modern-and-sleek-design-rs52b3000m9-pe-thumb-537509778?$252_252_PNG$',
10000,'text',(select id from categorias where categoria='Electrodomésticos')
),
('Galaxy S24 Ultra 5G 512GB','https://shop.samsung.com/latin/pub/media/catalog/product/cache/45eacecef37c2d34dea6bd1d0132e77c/s/m/sm-s928_3agarantia_thumb.png',
1231.23,'Galaxy S24 Ultra 5G 512GB',(select id from categorias where categoria='Mobile')
),
('Galaxy A35 5G 256GB','https://shop.samsung.com/latin/pub/media/catalog/product/cache/a69170b4a4f0666a52473c2224ba9220/s/m/sm-a356_3agarantia_2.png',
12332.23,'test',(select id from categorias where categoria='Mobile')
);


-- Insert 50 products across all categories

-- Electronics (10 products)
INSERT INTO products (name, description, price, image, images, stock) VALUES
('Sony 65" 4K Smart TV', 'Ultra HD Smart TV with HDR and Android TV', 89999.00, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'], 15),
('Samsung 55" QLED TV', 'Quantum Dot 4K Smart TV with AI upscaling', 74999.00, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'], 20),
('LG OLED 48" TV', 'Perfect blacks with OLED technology', 94999.00, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'], 8),
('Canon EOS M50 Camera', 'Mirrorless camera with 4K video', 54999.00, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', ARRAY['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400'], 12),
('Nikon D5600 DSLR', 'Professional DSLR with 24.2MP sensor', 49999.00, 'https://images.unsplash.com/photo-1606980707986-b6e0f3a7c14a?w=400', ARRAY['https://images.unsplash.com/photo-1606980707986-b6e0f3a7c14a?w=400'], 10),
('GoPro Hero 11', 'Action camera with 5.3K video', 39999.00, 'https://images.unsplash.com/photo-1518390185580-c7e0e1e2e8e1?w=400', ARRAY['https://images.unsplash.com/photo-1518390185580-c7e0e1e2e8e1?w=400'], 25),
('DJI Mini 3 Pro Drone', 'Compact drone with 4K HDR video', 64999.00, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400', ARRAY['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400'], 7),
('Ring Video Doorbell', 'Smart doorbell with HD video', 8999.00, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400', ARRAY['https://images.unsplash.com/photo-1558002038-1055907df827?w=400'], 30),
('Nest Thermostat', 'Smart learning thermostat', 12999.00, 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400', ARRAY['https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400'], 18),
('Philips Hue Starter Kit', 'Smart LED bulbs with color control', 14999.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'], 22);

-- Laptops (12 products)
INSERT INTO products (name, description, price, image, images, stock) VALUES
('MacBook Pro 14" M2', 'Apple M2 Pro chip, 16GB RAM, 512GB SSD', 189999.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'], 10),
('MacBook Air M2', 'Apple M2 chip, 8GB RAM, 256GB SSD', 114999.00, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400', ARRAY['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400'], 15),
('Dell XPS 15', 'Intel i7, 16GB RAM, 512GB SSD, RTX 3050', 139999.00, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400', ARRAY['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'], 12),
('HP Spectre x360', '2-in-1 convertible, Intel i7, 16GB RAM', 124999.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'], 8),
('Lenovo ThinkPad X1', 'Business laptop, Intel i7, 16GB RAM', 129999.00, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'], 14),
('ASUS ROG Zephyrus G14', 'Gaming laptop, Ryzen 9, RTX 4060', 149999.00, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'], 9),
('MSI Stealth 15', 'Gaming laptop, Intel i7, RTX 4070', 164999.00, 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400', ARRAY['https://images.unsplash.com/photo-1625225233840-695456021cde?w=400'], 7),
('Acer Swift 3', 'Budget laptop, Ryzen 5, 8GB RAM', 44999.00, 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=400', ARRAY['https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=400'], 20),
('Microsoft Surface Laptop 5', 'Intel i7, 16GB RAM, touchscreen', 119999.00, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'], 11),
('Razer Blade 15', 'Premium gaming laptop, RTX 4080', 224999.00, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'], 5),
('LG Gram 17', 'Ultra-light 17" laptop, Intel i7', 134999.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'], 6),
('Samsung Galaxy Book3', 'Intel i5, 8GB RAM, AMOLED display', 74999.00, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', ARRAY['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400'], 13);

-- Smartphones (12 products)
INSERT INTO products (name, description, price, image, images, stock) VALUES
('iPhone 15 Pro Max', 'A17 Pro chip, 256GB, Titanium design', 159900.00, 'https://images.unsplash.com/photo-1592286927505-b0501400cda9?w=400', ARRAY['https://images.unsplash.com/photo-1592286927505-b0501400cda9?w=400'], 25),
('iPhone 15', 'A16 chip, 128GB, Dynamic Island', 79900.00, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400', ARRAY['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'], 30),
('Samsung Galaxy S24 Ultra', 'Snapdragon 8 Gen 3, 12GB RAM, S Pen', 124999.00, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'], 20),
('Samsung Galaxy S24', 'Snapdragon 8 Gen 3, 8GB RAM', 79999.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'], 28),
('Google Pixel 8 Pro', 'Google Tensor G3, best camera', 84999.00, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', ARRAY['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'], 15),
('OnePlus 12', 'Snapdragon 8 Gen 3, 120Hz display', 64999.00, 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400', ARRAY['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400'], 22),
('Xiaomi 14 Pro', 'Snapdragon 8 Gen 3, Leica camera', 74999.00, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400', ARRAY['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400'], 18),
('Vivo X100 Pro', '200MP camera, Dimensity 9300', 69999.00, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400', ARRAY['https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400'], 16),
('OPPO Find X7', 'Hasselblad camera, fast charging', 64999.00, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', ARRAY['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400'], 14),
('Nothing Phone 2', 'Unique glyph interface, Snapdragon 8+', 44999.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'], 24),
('Motorola Edge 40 Pro', 'Snapdragon 8 Gen 2, clean Android', 49999.00, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400', ARRAY['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'], 12),
('Realme GT 5 Pro', 'Snapdragon 8 Gen 3, budget flagship', 39999.00, 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400', ARRAY['https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400'], 26);

-- Accessories (8 products)
INSERT INTO products (name, description, price, image, images, stock) VALUES
('Apple Watch Series 9', 'GPS + Cellular, health tracking', 44900.00, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400', ARRAY['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400'], 30),
('Magic Keyboard for iPad', 'Floating design with trackpad', 24900.00, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', ARRAY['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'], 18),
('Logitech MX Master 3S', 'Wireless productivity mouse', 8999.00, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', ARRAY['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'], 40),
('Samsung 1TB SSD T7', 'Portable external SSD, 1050 MB/s', 9999.00, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', ARRAY['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'], 35),
('Anker 65W Charger', 'GaN fast charger, 3 ports', 3999.00, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400', ARRAY['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400'], 50),
('Belkin 3-in-1 Wireless Charger', 'For iPhone, Watch, AirPods', 11999.00, 'https://images.unsplash.com/photo-1591290619762-c588f0eaf71c?w=400', ARRAY['https://images.unsplash.com/photo-1591290619762-c588f0eaf71c?w=400'], 25),
('Spigen Tough Armor Case', 'iPhone 15 Pro protective case', 2499.00, 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400', ARRAY['https://images.unsplash.com/photo-1601593346740-925612772716?w=400'], 60),
('Sandisk 256GB SD Card', 'UHS-I, 170 MB/s read speed', 3499.00, 'https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=400', ARRAY['https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=400'], 45);

-- Audio (8 products)
INSERT INTO products (name, description, price, image, images, stock) VALUES
('Sony WH-1000XM5', 'Industry-leading noise cancellation', 29999.00, 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400', ARRAY['https://images.unsplash.com/photo-1545127398-14699f92334b?w=400'], 28),
('AirPods Pro 2', 'Active noise cancellation, USB-C', 24900.00, 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400', ARRAY['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400'], 35),
('Bose QuietComfort Ultra', 'Spatial audio, premium comfort', 32999.00, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400', ARRAY['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'], 20),
('JBL Flip 6', 'Portable Bluetooth speaker, IP67', 11999.00, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'], 40),
('Sonos Era 100', 'Smart speaker with spatial audio', 24999.00, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400', ARRAY['https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400'], 15),
('Sennheiser Momentum 4', 'Audiophile wireless headphones', 34999.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'], 12),
('Beats Studio Pro', 'Personalized spatial audio', 29999.00, 'https://images.unsplash.com/photo-1491927570842-0261e477d937?w=400', ARRAY['https://images.unsplash.com/photo-1491927570842-0261e477d937?w=400'], 22),
('Samsung Galaxy Buds2 Pro', 'Hi-Fi sound, intelligent ANC', 16999.00, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'], 30);

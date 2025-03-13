import React from "react";
import { Link } from "react-router-dom";
import "./ActionPlan.css";

function ActionPlan() {
  return (
    <div className="container">
      <div className="header">
        <div className="blue-overlay"></div>
        <h1 className="header-content">BOSTON'S RODENT ACTION PLAN</h1>
      </div>

      <div className="center-box">
        <Link to="/rat-mitigation">
          <button className="learn-more-btn">LEARN MORE</button>
        </Link>
        <div className="inner-box">
          <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Eleifend
            hendrerit metus eleifend taciti aptent quam porttitor ante. Faucibus
            quam suspendisse tellus enim suspendisse. Ante curabitur dapibus id
            hendrerit conubia inceptos est. Lorem ipsum odor amet, consectetuer
            adipiscing elit. Eleifend hendrerit metus eleifend taciti aptent
            quam porttitor ante. Faucibus quam suspendisse tellus enim
            suspendisse. Ante curabitur dapibus id hendrerit conubia inceptos
            est.
          </p>
        </div>
      </div>

      <div className="content">
        <h2>LOREM IPSUM</h2>
        <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mi habitant mi
          maximus quis nulla pretium; fames curae. In at maximus varius
          ridiculus vestibulum vel elementum imperdiet. Ex at laoreet odio; nisi
          hendrerit cursus non. Elit phasellus curabitur ultricies est morbi
          hendrerit. Mus at maecenas habitant aenean dictumst ridiculus in arcu.
          Eros montes euismod per ut fames justo porttitor.
        </p>
        <h2 style={{ borderBottom: "5px solid black", paddingBottom: "5px" }}>
          BRAP PLAN
        </h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1 }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              risus euismod ridiculus nostra torquent venenatis.
            </p>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris
              ridiculus nostra torquent venenatis aptent placerat tempus cras
              egestas. Libero ullamcorper integer sodales ex augue condimentum
              semper. Tortor faucibus curabitur dui non magna suspendisse.
              Gravida inceptos ut per, nibh aptent litora ullamcorper. Tincidunt
              dui risus; gravida tempor in mollis. Enim leo luctus eget
              adipiscing facilisi curabitur dis varius. Adipiscing commodo arcu
              tristique etiam phasellus. Ornare ultrices pellentesque ante
              platea vivamus habitasse vehicula pulvinar rutrum. Curabitur
              mollis velit in congue mattis nullam; mi aliquam fames. Posuere
              curabitur auctor augue inceptos eleifend tellus vehicula volutpat.
              Consequat augue vitae hendrerit turpis vitae ultricies laoreet
              pretium. Diam himenaeos convallis vulputate sollicitudin vivamus
              leo aliquet amet.
            </p>

            <p>
              Augue ac velit mauris ullamcorper placerat. Accumsan enim
              consequat primis inceptos maecenas ornare fermentum. Tellus amet
              platea tortor rutrum posuere felis himenaeos senectus. Magna
              sagittis congue eros consectetur tristique consectetur a. Leo
              convallis duis tempus torquent porttitor efficitur bibendum. Mus
              dis et, ut molestie rhoncus sit. Turpis libero ullamcorper maximus
              accumsan praesent nam tristique nunc. Mus hac euismod phasellus
              convallis sodales non erat. Penatibus enim scelerisque in
              consequat magna auctor. Nostra fusce class aenean facilisi cursus;
              sagittis facilisi euismod. Commodo lectus sem class metus lacus
              netus? Nascetur ipsum nisi ac sagittis penatibus taciti odio. Sed
              dis velit quis tristique lacus elit. Ornare sodales sagittis
              malesuada praesent; cursus malesuada dui. Ornare venenatis
              lobortis inceptos ipsum ultricies torquent massa tempus nec.
              Efficitur lectus fermentum habitasse auctor eros pretium. Arcu
              ante consequat sodales dapibus finibus ex inceptos. Ridiculus
              justo nostra vestibulum curabitur; blandit tellus?
            </p>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="/assets/rat_image.png"
              style={{ width: "100%", marginBottom: "10px" }}
              alt="this is the alt"
            />

            <p style={{ fontWeight: "bold", paddingBottom: "0px ", textAlign: "left"}}>
              LOREM IPSUM
            </p>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit cras
              dis pretium posuere leo curae potenti. Cursus aliquet penatibus
              potenti, primis ipsum maecenas augue non. Litora congue fringilla
              magna tincidunt nostra augue ad scelerisque netus. Adipiscing sem
              mauris dignissim efficitur curabitur ante vestibulum tellus
              mauris. Ex class nostra laoreet pulvinar rhoncus rhoncus
              scelerisque sapien. Nulla magna placerat purus ut eu ultricies
              suspendisse. Nunc vitae dui est sociosqu mauris. Rhoncus ut
              ultricies porttitor penatibus habitasse, tempor conubia nascetur.
            </p>
          </div>
        </div>

        <h2 style={{ borderBottom: "5px solid black", paddingBottom: "5px" }}>
          MITIGATION EFFORTS
        </h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1 }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              risus euismod ridiculus nostra torquent venenatis.
            </p>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris
              ridiculus nostra torquent venenatis aptent placerat tempus cras
              egestas. Libero ullamcorper integer sodales ex augue condimentum
              semper. Tortor faucibus curabitur dui non magna suspendisse.
              Gravida inceptos ut per, nibh aptent litora ullamcorper. Tincidunt
              dui risus; gravida tempor in mollis. Enim leo luctus eget
              adipiscing facilisi curabitur dis varius. Adipiscing commodo arcu
              tristique etiam phasellus. Ornare ultrices pellentesque ante
              platea vivamus habitasse vehicula pulvinar rutrum. Curabitur
              mollis velit in congue mattis nullam; mi aliquam fames. Posuere
              curabitur auctor augue inceptos eleifend tellus vehicula volutpat.
              Consequat augue vitae hendrerit turpis vitae ultricies laoreet
              pretium. Diam himenaeos convallis vulputate sollicitudin vivamus
              leo aliquet amet.
            </p>

            <p>
              Augue ac velit mauris ullamcorper placerat. Accumsan enim
              consequat primis inceptos maecenas ornare fermentum. Tellus amet
              platea tortor rutrum posuere felis himenaeos senectus. Magna
              sagittis congue eros consectetur tristique consectetur a. Leo
              convallis duis tempus torquent porttitor efficitur bibendum. Mus
              dis et, ut molestie rhoncus sit. Turpis libero ullamcorper maximus
              accumsan praesent nam tristique nunc. Mus hac euismod phasellus
              convallis sodales non erat. Penatibus enim scelerisque in
              consequat magna auctor. Nostra fusce class aenean facilisi cursus;
              sagittis facilisi euismod. Commodo lectus sem class metus lacus
              netus? Nascetur ipsum nisi ac sagittis penatibus taciti odio. Sed
              dis velit quis tristique lacus elit. Ornare sodales sagittis
              malesuada praesent; cursus malesuada dui. Ornare venenatis
              lobortis inceptos ipsum ultricies torquent massa tempus nec.
              Efficitur lectus fermentum habitasse auctor eros pretium. Arcu
              ante consequat sodales dapibus finibus ex inceptos. Ridiculus
              justo nostra vestibulum curabitur; blandit tellus?
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", paddingBottom: "0px " }}>
              LOREM IPSUM
            </p>

            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit cras
              dis pretium posuere leo curae potenti. Cursus aliquet penatibus
              potenti, primis ipsum maecenas augue non. Litora congue fringilla
              magna tincidunt nostra augue ad scelerisque netus. Adipiscing sem
              mauris dignissim efficitur curabitur ante vestibulum tellus
              mauris. Ex class nostra laoreet pulvinar rhoncus rhoncus
              scelerisque sapien. Nulla magna placerat purus ut eu ultricies
              suspendisse. Nunc vitae dui est sociosqu mauris. Rhoncus ut
              ultricies porttitor penatibus habitasse, tempor conubia nascetur.
            </p>

            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Porta taciti
              eu conubia vulputate fermentum morbi. Dis porttitor fringilla
              adipiscing ex efficitur dolor. Bibendum ornare mollis lacinia
              volutpat euismod tristique. Cubilia ex mattis; per netus interdum
              egestas. Penatibus risus vulputate faucibus fames, ligula egestas
              vel finibus. Nec consequat integer interdum facilisi consequat.
              Faucibus nulla magnis taciti, tincidunt magnis sed aliquam. Dictum
              aliquet eu ut maximus nisi mi nisl. Fringilla mus mattis mauris;
              placerat eleifend parturient. Augue in condimentum efficitur leo
              aptent tellus molestie. Auctor eros curabitur etiam ultricies
              malesuada etiam dapibus orci. Magna vitae nam nulla malesuada dui
              vivamus facilisis. Placerat magna nunc urna netus consectetur leo
              quis. Volutpat nisi eu eleifend himenaeos maximus odio urna
              viverra. Vivamus condimentum ante fames morbi lobortis, nec
              condimentum lorem. Maximus risus mi ut fermentum accumsan ac
              primis etiam.
            </p>

            <p style={{ fontWeight: "bold", paddingBottom: "0px " }}>
              LOREM IPSUM
            </p>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit cras
              dis pretium posuere leo curae potenti. Cursus aliquet penatibus
              potenti, primis ipsum maecenas augue non. Litora congue fringilla
              magna tincidunt nostra augue ad scelerisque netus. Adipiscing sem
              mauris dignissim efficitur curabitur ante vestibulum tellus
              mauris. Ex class nostra laoreet pulvinar rhoncus rhoncus
              scelerisque sapien. Nulla magna placerat purus ut eu ultricies
              suspendisse. Nunc vitae dui est sociosqu mauris. Rhoncus ut
              ultricies porttitor penatibus habitasse, tempor conubia nascetur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionPlan;

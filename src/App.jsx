import { useState } from "react";

const apps = [
  {
    category: "Tagesgeschäft",
    items: [
      { name: "Überführungsbuch", url: "https://abholunghygienischeversorgung.vercel.app", icon: "🚐" },
      { name: "Beratungsapp", url: "https://beratungsapp.vercel.app", icon: "💬" },
      { name: "QM Hygiene", url: "https://qm-hygiene-reinigung-desinfektion.vercel.app", icon: "✅" },
      { name: "Aufgaben", url: "https://todo-sable-nu-12.vercel.app", icon: "📋" },
    ]
  },
  {
    category: "Verwaltung & Buchhaltung",
    items: [
      { name: "Beleg-Assistent", url: "https://sevdesk-beleg-assistent.vercel.app", icon: "🧾" },
      { name: "Debitorennummern", url: "https://sevdesk-debitoren.vercel.app", icon: "🔢" },
      { name: "Zeiterfassung", url: "https://zeiterfassung-bh-kallwass.vercel.app", icon: "⏱️" },
      { name: "Urnen-Inventar", url: null, icon: "🏺" },
    ]
  },
  {
    category: "Extern",
    items: [
      { name: "sevDesk", url: "https://my.sevdesk.de", icon: "💼", external: true },
      { name: "CleverOne", url: "https://app.cleverone.io", icon: "⚙️", external: true },
    ]
  }
];

export default function KallwassShell() {
  const [active, setActive] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const allItems = apps.flatMap(g => g.items);
  const activeApp = allItems.find(a => a.name === active);

  function handleSelect(item) {
    if (item.external) { window.open(item.url, "_blank"); return; }
    if (!item.url) return;
    setActive(item.name);
  }

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"'DM Sans',sans-serif", background:"#0f0f0f", color:"#e8e2d9", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .ni{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;cursor:pointer;font-size:13.5px;color:#a09a92;transition:all 0.15s;user-select:none;}
        .ni:hover{background:rgba(255,255,255,0.05);color:#e8e2d9;}
        .ni.act{background:rgba(196,168,120,0.12);color:#c4a878;}
        .ni.dis{opacity:0.35;cursor:not-allowed;}
        .cat{font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#555;padding:16px 14px 6px;}
        .tbtn{background:none;border:none;color:#555;cursor:pointer;padding:4px 8px;border-radius:4px;font-size:16px;transition:color 0.15s;line-height:1;}
        .tbtn:hover{color:#e8e2d9;}
        iframe{border:none;width:100%;height:100%;}
      `}</style>

      {sidebarOpen && (
        <div style={{ width:220, minWidth:220, background:"#111", borderRight:"1px solid #1e1e1e", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"18px 14px 12px", borderBottom:"1px solid #1a1a1a", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:"#c4a878", letterSpacing:"0.03em" }}>Kallwaß</div>
              <div style={{ fontSize:9.5, letterSpacing:"0.12em", color:"#444", textTransform:"uppercase", marginTop:1 }}>Bestattungshaus</div>
            </div>
            <button className="tbtn" onClick={() => setSidebarOpen(false)} title="Sidebar schließen">←</button>
          </div>

          <div style={{ overflowY:"auto", flex:1, padding:"4px 8px 16px" }}>
            {apps.map(group => (
              <div key={group.category}>
                <div className="cat">{group.category}</div>
                {group.items.map(item => (
                  <div
                    key={item.name}
                    className={`ni${active===item.name?" act":""}${!item.url?" dis":""}`}
                    onClick={() => handleSelect(item)}
                    title={!item.url ? "Noch keine URL hinterlegt" : item.external ? "Öffnet neues Tab" : ""}
                  >
                    <span style={{ fontSize:15 }}>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.external && <span style={{ marginLeft:"auto", fontSize:10, opacity:0.4 }}>↗</span>}
                    {!item.url && <span style={{ marginLeft:"auto", fontSize:9, opacity:0.35 }}>bald</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ padding:"10px 14px", borderTop:"1px solid #1a1a1a", fontSize:10, color:"#333", letterSpacing:"0.06em" }}>
            BH Kallwaß · Stralsund
          </div>
        </div>
      )}

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ height:44, background:"#111", borderBottom:"1px solid #1a1a1a", display:"flex", alignItems:"center", padding:"0 16px", gap:12, flexShrink:0 }}>
          {!sidebarOpen && (
            <button className="tbtn" onClick={() => setSidebarOpen(true)} title="Sidebar öffnen">→</button>
          )}
          {activeApp ? (
            <>
              <span style={{ fontSize:15 }}>{activeApp.icon}</span>
              <span style={{ fontSize:13, color:"#c4a878", letterSpacing:"0.02em" }}>{activeApp.name}</span>
              <a href={activeApp.url} target="_blank" rel="noreferrer"
                style={{ marginLeft:"auto", fontSize:11, color:"#444", textDecoration:"none", letterSpacing:"0.05em" }}>
                ↗ in neuem Tab öffnen
              </a>
            </>
          ) : (
            <span style={{ fontSize:12, color:"#333", letterSpacing:"0.05em" }}>App auswählen</span>
          )}
        </div>

        <div style={{ flex:1, overflow:"hidden", background:"#0f0f0f" }}>
          {activeApp ? (
            <iframe key={activeApp.url} src={activeApp.url} title={activeApp.name} allow="fullscreen" />
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, color:"#2a2a2a", letterSpacing:"0.04em" }}>Kallwaß</div>
              <div style={{ width:32, height:1, background:"#222" }} />
              <div style={{ fontSize:11, color:"#2a2a2a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Bestattungshaus · Stralsund</div>
              <div style={{ fontSize:11, color:"#1e1e1e", marginTop:20, letterSpacing:"0.04em" }}>← App aus der Sidebar wählen</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
